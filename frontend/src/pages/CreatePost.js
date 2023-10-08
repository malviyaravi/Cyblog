/* eslint-disable */
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { api } from "../api";

export default function CreatePost() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: cookies.UserId,
    title: "",
    content: "",
    hashes: [],
    // TODO
    collaborators: [],
    attachments: [],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let s = formData.hashes;
    const h = s.split(",");
    // console.log(formData)
    const newBlog = {
      username: formData.username,
      title: formData.title,
      content: formData.content,
      hashes: h,
      collaborators: formData.collaborators,
      attachments: formData.attachments,
    };
    const params = {
      username: cookies["UserId"],
      token: cookies["AuthToken"],
    };
    try {
      setLoading(true);
      const res = await api.putBlog(newBlog, params);

      setLoading(false);
      navigate("/profile");
      window.location.reload();
    } catch (e) {
      console.log(e.response.message);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  console.log(formData);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#0287BF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="onboarding bg-[#E1E9F4] bg-opacity-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0287BF] text-center pt-8 pb-5">
        Create New Post
      </h2>

      <form
        className="justify-center w-[50%] ml-[25%] md:w-[36%] md:ml-[32%]"
        onSubmit={handleSubmit}
      >
        <section className="flex flex-col">
          <label htmlFor="title" className="mt-2.5 text-start">
            Title
          </label>
          <input
            className="p-2 md:p-3 w-[100%] border-[#2f2e41] border-2 rounded-lg mt-2.5 mb-2.5 text-base"
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            required={true}
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="content" className="mt-2.5 text-start">
            Content
          </label>
          <textarea
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="content"
            
            name="content"
            required={true}
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
          />

          <label htmlFor="hashes" className="mt-2.5 text-start">
            Hahes
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="hashes"
            type="text"
            name="hashes"
            required={true}
            placeholder="Enter hashes separarted by commas"
            value={formData.hashes}
            onChange={handleChange}
          />
        </section>

        <button className="text-white bg-[#0287BF] px-4 py-2 md:px-6 md:py-3 m-2 rounded-full font-semibold w-fit text-lg md:text-xl cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}
