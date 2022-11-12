import Link from "next/link";

type AnchorProps = JSX.IntrinsicElements["a"];

const Anchor = (props: AnchorProps) => {
  const { href, ...other } = props;
  if (!href) return null;

  return (
    <>
      <Link href={href}><a {...other}></a></Link>
    </>
  );
};

export default Anchor;
