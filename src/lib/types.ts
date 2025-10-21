// User type definition
export interface User {
  _id: string;
  _creationTime: number;
  username: string;
  email: string;
  emailVerificationTime?: number;
  role?: "admin" | "user";
}

// Auth form field errors
export interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Registration form data
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// API Response types
export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Validation rules
export const ValidationRules = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  password: {
    minLength: 8,
    requireNumber: true,
    requireSpecialChar: true,
    specialCharPattern: /[!@#$%^&*(),.?":{}|<>]/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;