import { useState, useRef } from 'react'

export default function useForm(initialValue, url, url2, carpeta) {
  const [params, setParams] = useState(initialValue)
  const [errors, setErrors] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const hiddenFileInput = useRef(null);

  let regexText = /[a-zA-Z]{3,255}$/

  const validateParams = () => {
    let errors = {}

    for (const key in params) {
      let name = key.charAt(0).toUpperCase() + key.slice(1).split('_').join(' ')

      if (key !== "imagen") {
        if (params[key] === "" && key !== "imagen") {
          errors[key] = `El campo '${name}' está vacio.`
        } else if (params[key] === 0) {
          errors[key] = `El campo '${name}' no puede ser 0.`
        } else {
          if (parseInt(params[key]) === "NaN" && !regexText.test(params[key])) {
            errors[key] = `El campo '${name}' no es válido. Debe tener entre 3 y 255 carácteres.`
          }
          if (key === "isbn" && parseInt(params[key].length) < 13) {
            errors[key] = `El campo '${name}' debe tener 13 carácteres.`
          }
        }
      } else {
        if (key === "imagen" && params[name] === "") {
          errors[key] = `No hay una imagen seleccionada.`
        }
      }
    }
    return errors
  }

  const readParam = e => {
    const { name, value, files } = e.target

    if (files && files[0]) {
      const i = files[0];
      setCreateObjectURL(URL.createObjectURL(i));
      setParams({ ...params, [name]: i })
    } else {
      setParams({ ...params, [name]: value })
    }
  }

  const handleClickImagen = e => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors(null)

    let errors = validateParams()
    if (Object.keys(errors).length) return setErrors(errors)

    if (params.imagen) await uploadToServer()

    await createData()
  }

  const createData = async () => {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          params, imagen: params.imagen ? `${carpeta}/${params.imagen.name}` : null
        })
      }).then(res => res.json()).then(results => {
        if (results.ok) return window.location.href = url2
      })
    } catch (error) {
      console.log(error)
    }
  }

  const uploadToServer = async () => {
    const formData = new FormData();
    formData.append("file", params.imagen);
    await fetch(`/api/file/${carpeta}`, {
      method: "POST",
      body: formData
    });
  };

  return {
    params, errors, setParams,
    hiddenFileInput, createObjectURL,
    readParam, handleSubmit, handleClickImagen
  }
}
