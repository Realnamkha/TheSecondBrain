import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Logo from "../components/icons/Logo";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup() {
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      email,
      password,
    });
    navigate("/signin");
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl border min-w-48 flex flex-col p-8">
        <div className="flex flex-col items-center p-2 gap-4">
          <div className="pr-6 text-purple-600">
            <Logo size="lg" />
          </div>
          <div>
            <h1 className="text-purple-600 font-bold text-2xl">
              WELCOME TO BRAINLY
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Input reference={usernameRef} placeholder="Username" />
          <Input reference={emailRef} placeholder="Email" />
          <Input reference={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center mt-4">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Sign-In"
            size="md"
            fullwidth={true}
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <div>Already signed up?</div>
          <div className="mt-2">
            <Button
              onClick={() => navigate("/signin")}
              size="sm"
              text="Sign-In"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
