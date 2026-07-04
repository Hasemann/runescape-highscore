type ButtonProps = {
  name: string;
  additionalClasses: string;
  id: string;
  text: string;
};

export const ButtonElm = ({
  name = "",
  additionalClasses = "bg",
  id = "",
  text = "",
}: ButtonProps) => {
  return (
    <button id={id} className={additionalClasses} name={name} onClick={clickMe}>
      {text}
    </button>
  );
};

function clickMe(): void {
  console.log("hello motherfucker");
}
