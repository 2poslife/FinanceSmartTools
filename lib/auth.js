/**
 * Authentication utilities and middleware
 */

import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

/**
 * Verify JWT token and return decoded payload
 */
export function verifyToken(token, useRefreshSecret = false) {
  try {
    const jwtSecret = useRefreshSecret
      ? (process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your-secret-key-change-in-production')
      : (process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    const decoded = jwt.verify(token, jwtSecret);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Extract token from Authorization header
 */
export function extractToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7); // Remove "Bearer "
}

/**
 * Middleware to verify JWT token in API routes
 * Returns NextResponse on error, or { user } on success
 */
export function requireAuth(request) {
  const token = extractToken(request);

  if (!token) {
    return NextResponse.json(
      { detail: 'Not authenticated' },
      { status: 401 }
    );
  }

  const { valid, payload } = verifyToken(token);

  if (!valid) {
    return NextResponse.json(
      { detail: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  return { user: payload };
}

/**
 * Middleware to require admin role
 */
export function requireAdmin(request) {
  const authResult = requireAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (authResult.user.role !== 'admin') {
    return NextResponse.json(
      { detail: 'Access denied. Admin role required.' },
      { status: 403 }
    );
  }

  return { user: authResult.user };
}

