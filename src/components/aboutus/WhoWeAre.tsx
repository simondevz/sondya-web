import {
  WhoAreWeIcon1,
  WhoAreWeIcon2,
  WhoAreWeIcon3,
  bgWhoAreWe,
  rect,
} from "../../images/whoarewe";

const WhoWeAre = () => {
  return (
    <section className="flex flex-col md:flex-row gap-3 p-4 md:p-10 h-[70vh] md:h-auto justify-evenly">
      <div className=" w-full md:w-1/3 flex flex-col gap-5">
        <span className="flex flex-row gap-3 justify-center w-full">
          <img className="w-16" src={rect} alt="" />
          <h3>WHO WE ARE</h3>
        </span>
        <p
          className="bg-no-repeat bg-contain bg-center h-auto"
          style={{ backgroundImage: `url(${bgWhoAreWe})` }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
      <div className="flex flex-col gap-3 p-3 max-w-[500px]">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="w-1/5 object-contain h-8 max-w-[72px]"
            src={WhoAreWeIcon1}
            alt=""
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <img
            className="w-1/5 object-contain h-8 max-w-[72px]"
            src={WhoAreWeIcon2}
            alt=""
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <img
            className="w-1/5 object-contain h-8 max-w-[72px]"
            src={WhoAreWeIcon3}
            alt=""
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
