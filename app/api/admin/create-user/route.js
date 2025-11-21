import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '../../../../lib/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    // Check authentication and admin role
    const authResult = requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult; // Return error response
    }

    const body = await request.json();
    const { username, password, role } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { detail: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['admin', 'regular'];
    const userRole = role || 'regular';
    
    if (!validRoles.includes(userRole)) {
      return NextResponse.json(
        { detail: 'الدور غير صحيح. يجب أن يكون admin أو regular' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('finance_users')
      .select('id, username')
      .eq('username', username)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (expected if user doesn't exist)
      throw checkError;
    }

    if (existingUser) {
      return NextResponse.json(
        { detail: 'اسم المستخدم موجود بالفعل' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const { data: newUser, error: insertError } = await supabase
      .from('finance_users')
      .insert({
        username,
        password_hash: passwordHash,
        role: userRole,
      })
      .select('id, username, role, created_at')
      .single();

    if (insertError) {
      console.error('Error creating user:', insertError);
      return NextResponse.json(
        { detail: 'حدث خطأ أثناء إنشاء المستخدم' },
        { status: 500 }
      );
    }

    // Return success response (without password hash)
    return NextResponse.json({
      message: 'تم إنشاء المستخدم بنجاح',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { detail: 'حدث خطأ أثناء إنشاء المستخدم' },
      { status: 500 }
    );
  }
}

