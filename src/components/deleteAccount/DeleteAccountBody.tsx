const DeleteAccountBody = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className=" h-[80vh] flex flex-col justify-center p-5">
        <h3 className="font-bold text-[2rem]">User Account Deletion</h3>
        <h5 className="font-medium text-[1.4rem]">
          To delete user Account Follow the following processes:
        </h5>
        <ul className="list-item list-disc list-outside">
          <li>
            <p>
              Write to Sondya Team using our official email address
              <span className="text-[teal]"> support@sondya.com</span>, explain
              why you want your account to be deleted
            </p>
          </li>
          <li>
            <p>State Reasons why you want want your account to be deleted</p>
          </li>
          <li>
            <p>
              Details to be deleted are the{" "}
              <span className="text-[teal]">Username</span>,{" "}
              <span className="text-[teal]">Email</span>,{" "}
              <span className="text-[teal]">Encrypted Password</span> and{" "}
              <span className="text-[teal]"> Full name</span>
            </p>
          </li>
          <li>
            If you made a subcription or upgraded your account for the full
            feature the third party payment platform{" "}
            <span className="text-[teal]">Flutterwave.com</span> will receive a
            request from us to make necessary data deletions
          </li>
        </ul>
        <li>
          Note: you can still contact us through our website info on the website
          home page
        </li>
      </div>
    </div>
  );
};

export default DeleteAccountBody;
