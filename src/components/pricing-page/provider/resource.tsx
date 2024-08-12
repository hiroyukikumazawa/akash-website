import PricingUnit from "./pricing-unit";

const Resource = ({ img, title, content, percent, pricingTitle, pricingContent, price }: any) => {
    return (
        <div className="flex items-start gap-10 justify-between pb-7 border-b">
            <img src={img} alt="" />
            <PricingUnit
                title={title}
                content={content} />
            <PricingUnit
                title={pricingTitle}
                content={pricingContent} />
        </div>
    );
};

export default Resource;
