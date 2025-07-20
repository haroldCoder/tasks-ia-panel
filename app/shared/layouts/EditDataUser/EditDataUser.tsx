import React from "react";
import { UserData } from "../../interfaces/userData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Input from "../../Components/Input/Input";
import style from "./styles/editData.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { updateDataUserThunk } from "../../slices/users/usersSlice";

export const EditDataUser = (userData: UserData) => {
  const [email, setEmail] = React.useState(userData.email);
  const [cell, setCell] = React.useState(userData.cellphone);
  const [username, setUsername] = React.useState(userData.username);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeCellPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCell(e.target.value);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const updateData = () => {
    dispatch(
      updateDataUserThunk({
        term: email ? email : cell ? cell : "",
        userData: {
          ...(username != "" && username && { username }),
          ...(email != "" && email && { email }),
          ...(cell != "" && cell && { celphone: cell }),
        },
      })
    );
  };

  return (
    <div className="flex flex-col gap-14 mt-10">
      <section className="flex justify-end">
        <Image
          className="rounded-full"
          width={50}
          height={50}
          src={userData.avatar}
          alt={userData.username || "avatar"}
        />
      </section>
      <section className="grid grid-cols-1 gap-4">
        <Input
          className={style.input}
          value={username || ""}
          type="text"
          label={"Username"}
          onChange={handleChangeUsername}
        />
        <Input
          className={style.input}
          value={email || ""}
          type="email"
          label={"Email"}
          onChange={handleChangeEmail}
        />
        <Input
          className={style.input}
          value={cell || ""}
          type="text"
          label={"Cellphone"}
          onChange={handleChangeCellPhone}
        />
      </section>
      <Button className={style.btn} onClick={updateData}>
        <p>Update</p>
      </Button>
    </div>
  );
};
