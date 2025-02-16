import { MdOutlineEdit } from "react-icons/md";

const AccountHeader = ({edit, editMode, setEditMode, title, type}) => {
    return (
        <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">{title}</h2>
        {type === "user" && edit && (
          <button
            onClick={() => setEditMode(!editMode)}
            className="rounded-full text-xl text-slate-600 flex items-center justify-center m-2 md:m-0"
          >
            {editMode ? (
              "Cancel"
            ) : (
              <>
                <MdOutlineEdit className="text-slate-600" />
              </>
            )}
          </button>
        )}
      </div>
    );
};

export default AccountHeader;