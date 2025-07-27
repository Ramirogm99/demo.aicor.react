import "./login.css";
import LoginLayout from "../../../LoginLayout";
import LoginForm from '../../components/ui/login_form';

function Login() {
  return (
    <LoginLayout>
      <div className="col-span-1">
        <div className="background-gradient p-4"></div>
      </div>
        <LoginForm />
      <div className="col-span-1">
        <div className="background-gradient p-4"></div>
      </div>
    </LoginLayout>
  );
}

export default Login;
