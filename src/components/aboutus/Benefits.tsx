import {
  AboutUsContact,
  AboutUsPayment,
  AboutUsReturn,
} from "../../images/whoarewe";

const Benefits = () => {
  return (
    <section className="flex flex-col w-full gap-6 bg-[#EDB8424D] py-12 px-5">
      <div className="mx-auto playfair-display font-[700] text-[35px] text-center">
        Benefits for your expediency
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex flex-col gap-1 items-center max-w-[14rem]">
          <div className="p-2 bg-[#EEEBFF] rounded-3xl max-w-[6.5rem]">
            <img src={AboutUsPayment} alt="" />
          </div>
          <div className="playfair-display font-[700] text-[25px] text-center">
            Payment Method
          </div>
          <div className="text-center">
            We offer flexible payment options, to make easier.
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center max-w-[14rem]">
          <div className="p-2 bg-[#FFF4E7] rounded-3xl max-w-[6.5rem]">
            <img src={AboutUsReturn} alt="" />
          </div>
          <div className="playfair-display font-[700] text-[25px] text-center">
            Return policy
          </div>
          <div className="text-center">
            You can return a product within 30 days.
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center max-w-[14rem]">
          <div className="p-2 bg-[#CAF3E5] rounded-3xl max-w-[6.5rem]">
            <img src={AboutUsContact} alt="" />
          </div>
          <div className="playfair-display font-[700] text-[25px] text-center">
            Customer Support
          </div>
          <div className="text-center">Our customer support is 24/7.</div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
