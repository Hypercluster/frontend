import BotFailed from "./BotCheckFailedModal";
import ClaimModal from "./ClaimModal";
import FriendsNotAcceptedModal from "./FriendsNotAcceptedModal";
import NotReferredModal from "./NotReferedModal";
import ReferModal from "./ReferModal";
import ReferredModal from "./ReferredModal";
import SuccessModal from "./SuccessModal";
import WalletNotReferredModal from "./WalletNotReferred";

export default function Modal({
  select,
  params,
  close,
}: {
  select: string;
  params: string[];
  close: () => void;
}) {
  return (
    select != "none" && (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={close}></div>
        <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-[#FF5906] p-4 z-50 opacity-100 w-[28%] rounded-lg">
          {select == "referred" ? (
            <ReferredModal params={params} close={close} />
          ) : select == "botFail" ? (
            <BotFailed close={close} />
          ) : select == "claim" ? (
            <ClaimModal params={params} close={close} />
          ) : select == "friendsNo" ? (
            <FriendsNotAcceptedModal close={close} />
          ) : select == "walletNot" ? (
            <WalletNotReferredModal close={close} />
          ) : select == "notReferred" ? (
            <NotReferredModal close={close} />
          ) : select == "success" ? (
            <SuccessModal close={close} />
          ) : select == "refer" ? (
            <ReferModal close={close} params={params} />
          ) : (
            <></>
          )}
        </div>
      </>
    )
  );
}
