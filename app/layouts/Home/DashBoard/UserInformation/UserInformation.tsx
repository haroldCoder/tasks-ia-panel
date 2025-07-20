import Button from "@/app/shared/Components/Button/Button";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import styles from "./styles/userInformation.module.css";
import { IoSettings } from "react-icons/io5";
import Modal from "@/app/shared/Components/Modal/Modal";
import { EditDataUser } from "@/app/shared/layouts/EditDataUser/EditDataUser";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Spinner } from "@/app/shared/Components/Spinner/Spinner";

const UserInformation = () => {
  const { user } = useClerk();
  const [edit, setEdit] = React.useState<boolean>(false);
  const { loadingUpdate, successUpdate, data } = useSelector((state: RootState) => state.users);

  const openModalEdit = () => {
    setEdit(true);
  };

  const closeModalEdit = () => {
    setEdit(false);
  };

  React.useEffect(()=>{
    if(successUpdate){
      closeModalEdit()
    }
  }, [loadingUpdate])

  return (
    <>
      {edit && (
        <Modal
          className={!loadingUpdate ? styles.modal : styles.no_modal}
          closeIcon={loadingUpdate && <></>}
          onClose={closeModalEdit}
        >
          {loadingUpdate ? (
            <Spinner />
          ) : (
            <EditDataUser
              avatar={user?.imageUrl!}
              username={data?.username}
              email={data?.email}
              cellphone={data?.celphone}
            />
          )}
        </Modal>
      )}
      <div className="flex flex-col gap-6 p-8 rounded-lg bg-gradient-to-bl from-gray-700 to-gray-950">
        <Image
          src={user!.imageUrl}
          width={50}
          height={50}
          className="rounded-full"
          alt={user!.firstName!.toString()}
        />
        <div className="flex flex-col gap-3">
          <b>Full name</b>
          <p>
            {user?.firstName || "-"} {user?.lastName}
          </p>
        </div>
        <div>
          <b>Username</b>
          <p>{data?.username || "-"}</p>
        </div>
        <div>
          <b>Email</b>
          <p>{data?.email || "-"}</p>
        </div>
        <div>
          <b>Phone number</b>
          <p>{data?.celphone || "-"}</p>
        </div>
        <section className="w-full flex justify-between mt-4">
          <Button onClick={openModalEdit}>
            <IoSettings className="text-xl text-gray-300 hover:text-gray-700" />
          </Button>
          <SignOutButton>
            <Button className={styles.btn_logout}>
              <p>Logout</p>
            </Button>
          </SignOutButton>
        </section>
      </div>
    </>
  );
};

export default UserInformation;
