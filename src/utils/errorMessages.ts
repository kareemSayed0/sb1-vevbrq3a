export function getErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    'invalid_credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'email_not_confirmed': 'يرجى تأكيد بريدك الإلكتروني من خلال الرابط المرسل',
    'user_not_found': 'لم يتم العثور على المستخدم',
    'invalid_email': 'البريد الإلكتروني غير صالح',
    'weak_password': 'كلمة المرور ضعيفة جداً',
    'email_taken': 'البريد الإلكتروني مستخدم بالفعل',
    'network_error': 'خطأ في الاتصال بالخادم',
    'over_email_send_rate_limit': 'تم تجاوز الحد الأقصى لإرسال رسائل البريد الإلكتروني. يرجى المحاولة بعد دقائق',
    'auth/too-many-requests': 'تم تجاوز عدد المحاولات المسموح بها. يرجى المحاولة لاحقاً',
    'default': 'حدث خطأ غير متوقع'
  };

  // Extract error code from Supabase error message
  const errorCode = Object.keys(errorMessages).find(code => 
    error.toLowerCase().includes(code)
  ) || 'default';

  return errorMessages[errorCode];
}