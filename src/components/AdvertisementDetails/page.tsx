"use client";
import { useAppSelector } from "@/lib/store";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdvertisementDetails = () => {
  const user = useAppSelector((state) => state.auth.currentUser);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the last segment which should be the ID

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch data");
      }
      setLoading(false);
    };

    fetchData();
  }, [id, user?.token]);

  if (loading) {
    return (
      <div className="mx-auto h-[60px] w-[60px] animate-spin rounded-full border-2 border-b-0 border-r-0 border-[#6976ec] "></div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className=" max-w-4xl rounded-lg p-5">
      <h1 className="mb-3 text-2xl font-bold">{data?.postDescription}</h1>
      <img
        src={data?.image}
        alt="Post"
        className="mb-4 h-[300px] w-full rounded-lg"
      />

      <h2 className="mb-2 text-xl font-semibold">
        Likes: {data?.likes?.length}
      </h2>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Comments</h2>
        {data?.comments.length > 0 ? (
          data.comments.map((comment: any) => (
            <div
              key={comment._id}
              className="bg-gray-100 mb-2 rounded-lg p-4 shadow"
            >
              <h3 className="font-semibold">{comment.user.name}</h3>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdvertisementDetails;
