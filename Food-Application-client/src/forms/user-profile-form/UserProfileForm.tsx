import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};

type UserFormData = z.infer<typeof formSchema>;

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSave)}
      className="space-y-6 bg-white rounded-xl shadow-lg p-8 transition-transform transform hover:scale-105 duration-500"
    >
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">
          User Profile Form
        </h2>
        <p className="text-sm text-gray-500">
          View and update your user profile information
        </p>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          disabled
          {...form.register("email")}
          className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-300"
        />
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...form.register("name")}
          className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-300"
        />
      </div>

      {/* Address Line 1 Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Address Line 1
        </label>
        <input
          id="addressLine1"
          type="text"
          {...form.register("addressLine1")}
          className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-300"
        />
      </div>

      {/* City and Country Fields */}
      <div className="flex space-x-4">
        {/* City Field */}
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            {...form.register("city")}
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-300"
          />
        </div>

        {/* Country Field */}
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Country
          </label>
          <input
            id="country"
            type="text"
            {...form.register("country")}
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-300"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-orange-400 text-white rounded-md focus:outline-none hover:bg-orange-500 transition-all duration-300 transform"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
