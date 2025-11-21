import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { detail: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // Find user in database
    const { data: user, error: userError } = await supabase
      .from('finance_users')
      .select('id, username, password_hash, role')
      .eq('username', username)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { detail: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { detail: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );

    // Return success response
    return NextResponse.json({
      message: 'تم تسجيل الدخول بنجاح',
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { detail: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
}

