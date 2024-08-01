import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isLoading } = useSignUp();
  const { register, getValues, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const onSubmit = ({ fullName, email, password })=> {
    signUp({fullName, email, password}, {
      onSettled: ()=> reset()
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input type="text" id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input type="email" id="email" 
          {...register("email", { required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provid valid email"
            }
           })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password?.message}>
        <Input type="password" id="password" 
          {...register("password", { required: "This field is required", minLength: {
            value: 8,
            message: "Password need at list 8 minimum of characters"
          } })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" 
          {...register("passwordConfirm", { required: "This field is required",
            validate: (value)=> getValues().password === value || "Passwords need to match"
           })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
