import { familyImage } from "../../images";

const AboutUsHero = () => {
  return (
    <section className="text-white bg-[#000000] flex flex-col md:flex-row gap-4 p-5 md:p-14 justify-center">
      <div className="flex flex-col justify-around p-5 max-w-[500px]">
        <h4 className="font-[600]">About Us</h4>
        <h2 className="font-[800] text-[30px] playfair-display">
          <span className="text-[#EDB842]">Sondya</span>, a Family That Keeps On
          Growing
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Nulla massa et id euismod at
          fermentum ornare. Sed habitant odio odio interdum semper. Id nulla
          amet facilisi imperdiet condimentum.{" "}
        </p>
        <p>
          Feugiat et eu in vestibulum vel porttitor id tellus rhoncus. Morbi vel
          vitae habitant elit eu. Egestas dui sed mauris mauris. Netus at orci
          mi ut arcu. Aliquam gravida diam sa. Habitasse purus turpis tortor
          vitae sed est felis. Est tortor adipiscing.
        </p>
      </div>
      <img
        className="rounded-md object-cover max-w-[500px]"
        src={familyImage}
        alt=""
      />
    </section>
  );
};

export default AboutUsHero;
