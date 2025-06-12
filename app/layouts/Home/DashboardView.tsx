import { Spinner } from "@/app/shared/Components/Spinner/Spinner";
import { fetchUserThunk } from "@/app/shared/slices/users/usersSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useClerk } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundUser } from "./NotFoundUser/NotFoundUser";
import { DashBoard } from "./DashBoard/DashBoard";

export default function DashBoardView() {
  const { error, data, loading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useClerk();

  const fetchUser = async () => {
    await dispatch(
      fetchUserThunk(
        user?.emailAddresses
          ? user.emailAddresses[0].emailAddress
          : user?.phoneNumbers
          ? user.phoneNumbers[0].phoneNumber
          : ""
      )
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div className="p-12">
      {loading ? 
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner size="xl" />
      </div>
       : error ? <NotFoundUser /> : <DashBoard />}
    </div>
  );
}
