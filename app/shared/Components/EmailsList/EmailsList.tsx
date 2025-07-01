import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./styles/emailsList.module.css";
import ContainerSelect from "../MultiSelect/components/ContainerSelect/ContainerSelect";
import "./styles/emailsList.css";

interface EmailsListProps {
  emails: Array<string>;
  change: (email: Array<string>) => void;
  label: string;
}

function EmailsList({ emails, change, label }: EmailsListProps) {
  const [email, setEmail] = useState("");
  const setEmailHandle = (value: string) => {
    setEmail(value);
  };
  const [error, setError] = useState("");

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (email != "") {
      if (!emailRegex.test(email)) {
        setError("Invalid email");
      } else {
        setError("");
      }
    }
  }, [email]);

  const addEmail = () => {
    const newEmails = [...emails, email];
    change(newEmails);
    setEmail("");
  };

  const removeEmail = (email: string) => {
    const newEmails = emails.filter((ema) => ema !== email);
    change(newEmails);
  };

  return (
    <div>
      <p className="text-white mb-3">{label}</p>
      <div className={styles.container}>
        <section className="min-h-[40px] flex gap-4 flex-wrap max-w-full border-b-[1.2px] border-gray-700 py-6">
          {emails.length > 0 ? (
            emails.map((ema) => (
              <ContainerSelect value={ema} remove={() => removeEmail(ema)} />
            ))
          ) : (
            <p>Add emails for invitation</p>
          )}
        </section>
        <section className="w-full">
          <div className="flex gap-2 justify-center">
            <Input
              placeholder={"Email"}
              className={styles.input}
              value={email}
              type="text"
              onChange={(e) => setEmailHandle(e.target.value)}
            />
            <Button
              onClick={addEmail}
              disabled={error != ""}
              className={styles.btn}
            >
              Add
            </Button>
          </div>
          {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        </section>
      </div>
    </div>
  );
}

export default EmailsList;
