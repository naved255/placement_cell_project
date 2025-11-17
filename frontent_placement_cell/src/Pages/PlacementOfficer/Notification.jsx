import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const Notification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Notification Sent:", data);

    try {
      const res = await axios.post(
        "http://localhost:8000/notification/post",
        data,
        { withCredentials: true }
      );
      console.log(res.data?.message);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Send Notification
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Receiver */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Send To
            </label>
            <select
              {...register("receiver", { required: "Please select a receiver" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Select…</option>
              <option value="both">Both</option>
              <option value="students">Students</option>
              <option value="companies">Companies</option>
            </select>
            {errors.receiver && (
              <p className="text-red-600 text-sm mt-1">
                {errors.receiver.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Notification Title"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows="6"
              placeholder="Write your notification message here..."
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
            ></textarea>

            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            className={`w-full bg-green-600 text-white py-3 rounded-lg font-medium text-lg 
              ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"} 
              transition`}
          >
            {isSubmitting ? "Sending..." : "Send Notification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notification;
