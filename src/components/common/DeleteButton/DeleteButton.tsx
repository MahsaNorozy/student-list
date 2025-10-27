import React from "react";

interface Props {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

const DeleteButton: React.FC<Props> = ({
  ariaLabel = "Löschen",
  className,
  disabled,
  loading,
  onClick,
  title = "Löschen",
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
      type="button"
    >
      {loading ? (
        <span aria-hidden className="btn-loading" />
      ) : (
        <span aria-hidden className="delete-cross">
          ✖
        </span>
      )}
    </button>
  );
};

export default DeleteButton;
