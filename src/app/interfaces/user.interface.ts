//It's the same user for login and register so we created this interface

export interface User {
  _id:      string;
  email:    string;
  name:     string;
  isActive: boolean;
  roles:    string[];
}
