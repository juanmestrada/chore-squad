import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import CustomModal from '../../modal/Modal';
import Select, { SelectInstance } from "react-select";
import { useLoggedInAuth } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./New.css";

const NewChannel = () => {
    const { streamChat, user } = useLoggedInAuth();
    const navigate = useNavigate();

    const createChannel = useMutation({
        mutationFn: ({
            name,
            memberIds,
            imageUrl,
        }: {
            name: string
            memberIds: string[]
            imageUrl?: string
        }) => {

            if (streamChat == null) throw Error("Not connected");

            return streamChat.channel("messaging", crypto.randomUUID(), {
                name,
                image: imageUrl,
                members: [user.id, ...memberIds],
            }).create();
        },
        onSuccess() {
            navigate("/chore-squad/map/inbox");
        },
    })

    const nameRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const memberIdsRef = useRef<SelectInstance<{ label: string; value: string }>>(null);

    const users = useQuery({
        queryKey: ["stream", "users"],
        queryFn: () =>
            streamChat!.queryUsers({ id: { $ne: user.id } }, { name: 1 }),
            enabled: streamChat != null,
        }
    )

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const imageUrl = imageUrlRef.current?.value;
        const selectOptions = memberIdsRef.current?.getValue();

        if (name == null || name === "" || selectOptions == null || selectOptions.length === 0) {
            return
        }

        createChannel.mutate({
            name,
            imageUrl,
            memberIds: selectOptions.map(option => option.value),
        });
    }

    return (
        <CustomModal show={true} modalTitle="New Conversation" >
            <form onSubmit={handleSubmit} className="NewChannel">
                <div className="row form-group">
                    <label htmlFor="name" className="col-3 col-form-label">Name</label>
                    <div className="col-9">
                        <input name="name" type="text"  id="name" placeholder="Channel name ..." ref={nameRef} required />
                    </div>
                </div>

                <div className="row form-group">
                    <label htmlFor="imageUrl" className="col-3 col-form-label">Image Url</label>
                    <div className="col-9">
                        <input name="imageUrl" type="text" id="imageUrl" placeholder="Channel image ..." ref={imageUrlRef} required />
                    </div>
                </div>

                <div className="row form-group">
                    <label htmlFor="members" className="col-3 col-form-label">Members</label>
                    <div className="col-9">
                        <Select
                            ref={memberIdsRef}
                            id="members"
                            required
                            isMulti
                            classNames={{ container: () => "w-full" }}
                            isLoading={users.isLoading}
                            options={users.data?.users.map(user => {
                                return { value: user.id, label: user.name || user.id }
                            })}
                        />
                    </div>
                </div>
                
                <button disabled={createChannel.isLoading} type="submit" className="form-btn-next rounded-pill w-100 mt-4" >
                    {createChannel.isLoading ? "Loading..." : "Create"}
                </button>
            </form>
        </CustomModal>
    )
}

export default NewChannel;