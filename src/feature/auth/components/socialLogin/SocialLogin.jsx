import {Route, BrowserRouter, Routes} from "react-router-dom";
import SignIn from "./SignIn";

export function SocialLogin() {
  return (
    //   <BrowserRouter>
    //       <Routes>
    //           <Route path="/login" element={<SignIn />}></Route>
    //           <Route path="/auth/google" element={<GoogleCallback />}></Route>
    //       </Routes>
    //   </BrowserRouter>

<>
    <SignIn />
</>
  );
}
