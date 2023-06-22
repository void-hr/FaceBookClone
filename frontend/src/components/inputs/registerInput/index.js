import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function RegisterInput({ placeholder, bottom, ...props }) {
  /* 
    DESTRUCTRING:
      It is necessary to understand destructuring in this case as we are taking props from function signature.
      
      {placeholder, bottom, ...props } : This represents that from props we are distinctively extracting placeholder, bottom
      and then using props too by using ..props.

      If you console log props you won't find placeholder and bottom as they are already extracted. But if you console props
      without extracting the placeholder, bottom, you will get them in the console output.
  */

  /* 
    useField() is a custom React hook that will automagically help you hook up inputs to Formik. 
    You can and should use it to build your own custom input primitives. 
  */

  const [field, meta] = useField(props);

  /* Returns true when min-width > 539 */
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  })
   const view2 = useMediaQuery({
    query: "(min-width: 850px )",
  })
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  })

  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";
  return (
    <div className="input_wrap register_input_wrap">

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        style={{
          width: `${view1 && (field.name === 'first_name' || field.name === 'last_name')
            ?"100%"
            : view1 && (field.name === 'email' || field.name === 'password')
            ? "370px"
            : "300px"
            }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}


        /* This will return only class name whic is necesseray for Formik to bind. If you console them you will understand it better */
        {...field}
        /* This will return other properties such as type="password" which is required to hide text while typing.*/
        {...props}
      />


      {meta.touched && meta.error && (
        <div
          className={view3 ? "input_error input_error_desktop" : "input_error"}
          style={{ transform: "translateY(3px)", left: `${test1 ? '-107%' : test2 ? '107%': ""}` }}
        >
          {meta.touched && meta.error &&
            <ErrorMessage name={field.name} />
          }
          {meta.touched && meta.error &&
              <div className={view3 && field.name!=="last_name"  
              ? "error_arrow_left" 
              : view3 && field.name==="last_name"
              ? "error_arrow_right" 
              : !view3 && "error_arrow_bottom"
            }></div>
          }

        </div>
      )}

      {meta.touched && meta.error && (
        <i className="error_icon"></i>
      )}
    </div>
  );
}
