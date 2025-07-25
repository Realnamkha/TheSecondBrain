import CrossIcon from "../icons/CrossIcon";
import Input from "./Input";
import { Button } from "./Button";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import useOutsideClick from "../../hooks/useOutsideClick";
import Checkbox from "./Checkbox";

// Define ContentType as both a const object and type
export const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;

type ContentType = (typeof ContentType)[keyof typeof ContentType];

export function CreateContentModal({
  open,
  onClose,
}: {
  open: any;
  onClose: any;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType | "">("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    "Productivity",
    "Trending",
    "Health",
    "Sci-Fi",
    "Education",
    "Entertainment",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleClickOutside = () => {
    {
      onClose();
    }
  };

  const ref = useOutsideClick(handleClickOutside, open);
  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    console.log(selectedCategories);
  }

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();

    if (!title || !link || !type) {
      alert("Please provide Title, Link, and Content Type.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
          tags: selectedCategories,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") ?? "",
          },
        }
      );
      onClose();
    } catch (e: any) {
      alert(
        `Failed to add content: ${e?.response?.data?.message || e.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
      {/* Content */}
      <div
        ref={ref}
        className="relative max-w-96 z-10 bg-white p-4 rounded-2xl shadow-lg min-w-[400px]"
      >
        {/* Close button */}
        <div className="flex justify-end">
          <div onClick={onClose} className="cursor-pointer">
            <CrossIcon />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Input reference={titleRef} placeholder="title" />
          <Input reference={linkRef} placeholder="link" />
        </div>
        <div>
          <h2 className="text-center">Please select type</h2>
          <div className="flex justify-center gap-4 mt-2">
            <Button
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              size="sm"
              text={ContentType.Youtube}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              size="sm"
              text={ContentType.Twitter}
              onClick={() => setType(ContentType.Twitter)}
            />
          </div>
        </div>
        <div className="ml-4">
          <div className="mt-4">
            <h2>Select your categories</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 m-4 px-4">
            {categories.map((cat) => (
              <Checkbox
                key={cat}
                label={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
            ))}
          </div>
          <div>
            <div className="mt-4">
              <h2>Want to add your own categories</h2>
              <Input
                placeholder="Add new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className="ml-2">
                <Button
                  size="md"
                  text="Add"
                  variant="secondary"
                  onClick={() => {
                    const trimmed = newCategory.trim();
                    if (trimmed && !categories.includes(trimmed)) {
                      setCategories([...categories, trimmed]);
                      setNewCategory("");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={addContent}
            variant="primary"
            text={loading ? "Submitting..." : "Submit"}
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
