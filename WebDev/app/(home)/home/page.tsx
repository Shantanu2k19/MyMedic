"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Hello() {
  const { data: session } = useSession();
  console.log(session?.user?.name);

  const [imageFile, setImageFile] = useState(null);
  const [token, setToken] = useState("");

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const fetchCSRFToken = () => {
    fetch("https://mymedic.pythonanywhere.com/", {
      method: "GET",
      headers: {
        "User-Agent": "insomnia/8.6.1",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const csrfToken = data.csrf_token;
        console.log("hello props", csrfToken);
        setToken(csrfToken);
      })
      .catch((err) => console.error("error:" + err));
  };

  const handleUpload = () => {
    if (!imageFile || !token) return;

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("username", session?.user?.name || "");

    let url = "https://mymedic.pythonanywhere.com/getinfo";

    let options = {
      method: "POST",
      headers: {
        "User-Agent": "insomnia/8.6.1",
        "X-CSRFToken":
          "PDHLKFop9ABrzSuvr6B77CLtktTFbnELSSwKQy5nCJ0UVyF3X0OYO9IyJytfIxoL",
        Referer: "https://mymedic.pythonanywhere.com/getinfo",
      },
      body: formData,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
  };

  return (
    <>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={!imageFile}>
        Upload Image
      </button>
    </>
  );
}
