import {/* useRef ,*/ useState} from "react";
import useInput from "../hooks/UseInput";

const SimpleInput = (props) => {
    // THE BEST WAY TO HANDLE FORM VALUES ARE STATE RATHER USING REFS
    // const nameInputRef = useRef();
    /*
    const [enteredName, setEnteredName] = useState("");
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== "";
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;


    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    let enteredEmailIsValid = false;

    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail)) {
        enteredEmailIsValid = true;
    }

    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    /*
    const nameInputChangeHandler = event => {
        setEnteredName(event.target.value);
    }

    const nameInputBlurHandler = event => {
        setEnteredNameTouched(true);
    };


    const emailInputChangeHandler = event => {
        setEnteredEmail(event.target.value);
    }

    const emailInputBlurHandler = event => {
        setEnteredEmailTouched(true);
    };
     */

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== "");

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes("@"));


    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        console.log(enteredName);
        console.log(enteredEmail);

        // THE BEST WAY TO HANDLE FORM VALUES ARE STATE RATHER USING REFS
        // const enteredValue = nameInputRef.current.value;
        // console.log(enteredValue);

        // NOT IDEAL, BECAUSE THIS MANIPULATES THE DOM STRAIGHTAWAY WITHOUT THE HELP OF REACT
        // nameInputRef.current.value = "";

        /*
        setEnteredName("");
        setEnteredNameTouched(false);

        setEnteredEmail("");
        setEnteredEmailTouched(false);
        */

        resetNameInput();
        resetEmailInput();
    }

    const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
    const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={enteredName}
                    // ref={nameInputRef}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {nameInputHasError && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='name'>Your Email</label>
                <input
                    type='email'
                    id='email'
                    value={enteredEmail}
                    // ref={nameInputRef}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailInputHasError && <p className="error-text">Please enter a valid email</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;