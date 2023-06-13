import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function LoginInput({ placeholder, bottom, ...props }) {
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

  /* Returns true when min-width == 850 */
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  })

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={desktopView ? "input_error input_error_desktop" : "input_error"}
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error &&
            <ErrorMessage name={field.name} />
          }
          {meta.touched && meta.error &&
            <div className={desktopView ? "error_arrow_left" : "error_arrow_top"}></div>
          }
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        // type={field.type}
        // name={field.name}
        // placeholder={placeholder}


        /* This will return only class name whic is necesseray for Formik to bind. If you console them you will understand it better */
        {...field} 
        /* This will return other properties such as type="password" which is required to hide text while typing.*/
        {...props}
      />


      {meta.touched && meta.error && bottom && (
        <div
          className={desktopView ? "input_error input_error_desktop" : "input_error"}
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error &&
            <ErrorMessage name={field.name} />
          }
          {meta.touched && meta.error &&
            <div className={desktopView ? "error_arrow_left" : "error_arrow_bottom"}></div>
          }

        </div>
      )}

      {meta.touched && meta.error && (
        <i className="error_icon" style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}></i>
      )}
    </div>
  );
}
