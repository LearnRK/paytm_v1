import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./routes/signup";
import { Signin } from "./routes/signin";
import { Dashboard } from "./routes/dashboard";
import { SendMoney } from "./routes/sendmoney";
import { Landing } from "./routes/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/> 
        <Route path="/signup" element={<Signup />}/> 
        <Route path="/signin" element={<Signin />}/> 
        <Route path="/dashboard" element={<Dashboard />}/> 
        <Route path="/send" element={<SendMoney />}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App
