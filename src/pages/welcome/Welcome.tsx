import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Forms/Input/Input";
import { sanitizeFnNumbers } from "../../components/Forms/utils";
import { EMAIL_REGEXP } from "../../constants/regexPatterns";
import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import { WelcomeForm } from "./types";

const Welcome: FC = () => {
  const { addUser } = useUser();
  const history = useHistory();

  const {
    data: { email, firstName, lastName, phoneNumber },
    errors: {
      email: errorEmail,
      firstName: errorFirstName,
      lastName: errorLastName,
      phoneNumber: errorPhoneNumber,
    },
    handleFormChange,
    handleOnSubmit,
  } = useForm<WelcomeForm>({
    validations: {
      email: {
        pattern: {
          message: "This is an invalidad email",
          value: EMAIL_REGEXP,
        },
      },
      firstName: {
        required: { value: true, message: "The first name is required" },
      },
      lastName: {
        required: { value: true, message: "The last name is required" },
      },
      phoneNumber: {
        required: { value: true, message: "The phone number is required" },
      },
    },
    onSubmit: (formData) => {
      const { email, firstName, lastName, phoneNumber } = formData;
      if (email && firstName && lastName && phoneNumber) {
        addUser({ email, firstName, lastName, phoneNumber });
        history.push("/comparator");
      }
    },
    initialValues: {
      email: "",
      lastName: "",
      firstName: "",
      phoneNumber: "",
    },
  });

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-control">
        <Input
          name="firstName"
          value={firstName}
          hasError={errorFirstName}
          label="First name"
          onChange={handleFormChange("firstName")}
        />
        {errorFirstName && <div className="error">{errorFirstName}</div>}
      </div>
      <div className="form-control">
        <Input
          name="lastName"
          value={lastName}
          hasError={errorLastName}
          label="Last name"
          onChange={handleFormChange("lastName")}
        />
        {errorLastName && <div className="error">{errorLastName}</div>}
      </div>
      <div className="form-control">
        <Input
          name="email"
          value={email}
          hasError={errorEmail}
          label="Email"
          onChange={handleFormChange("email")}
        />
        {errorEmail && <div className="error">{errorEmail}</div>}
      </div>
      <div className="form-control">
        <Input
          name="phoneNumber"
          value={phoneNumber}
          hasError={errorPhoneNumber}
          label="Phone number"
          placeholder="(555) 555-5555"
          onChange={handleFormChange("phoneNumber", sanitizeFnNumbers)}
        />
        {errorPhoneNumber && <div className="error">{errorPhoneNumber}</div>}
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default Welcome;
