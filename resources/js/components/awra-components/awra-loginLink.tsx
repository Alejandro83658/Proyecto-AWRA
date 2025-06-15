import React from "react";

interface AwraLoginLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
}

const AwraLoginLink: React.FC<AwraLoginLinkProps> = ({ href = "/login", ...props }) => {
    const redirect =
        typeof window !== "undefined"
            ? encodeURIComponent(window.location.pathname + window.location.search)
            : "";
    const finalHref = href.includes("?")
        ? `${href}&redirect=${redirect}`
        : `${href}?redirect=${redirect}`;

    return <a href={finalHref} {...props} />;
};

export default AwraLoginLink;