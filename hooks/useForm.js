import { useState } from "react";
import { fetchPost } from "../services/funciones";
import { toast } from 'react-toastify'

export default function useForm(initialValue, url, url2) {
  const [params, setParams] = useState(initialValue);
  const [errors, setErrors] = useState(null);

  const validateParams = () => {
    let errors = {};

    for (const key in params) {
      let name = key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

      if (params[key] === "") {
        errors[key] = `El campo '${name}' está vacio.`;
      } else {
        if (key === "isbn" && parseInt(params[key].length) < 13) {
          errors[key] = `El campo '${name}' debe tener 13 carácteres.`;
        }
      }
    }

    return errors;
  };

  const readParam = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    let errors = validateParams();
    if (Object.keys(errors).length) return setErrors(errors);

    const response = await fetchPost(url, params);
    if (response.ok) {
      window.location.href = url2
    } else {
      toast.error(response.msg)
    }
  };

  return {
    params,
    errors,
    setParams,
    readParam,
    handleSubmit,
  };
}
