export type AuthFormState = {
  email?: string;
  success?: string;
  error?: string;
  fieldErrors?: {
    email?: string;
    adultConfirmed?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};
