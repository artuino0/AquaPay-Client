export const InputField = ({
  label,
  type,
  name,
  register,
  required = false,
  validate,
  errors,
}: any) => (
  <div>
    <input
      className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md"
      placeholder={label}
      type={type}
      {...register(name, { required, validate })}
    />
    {errors && errors[name] && (
      <span className="text-red-500">
        {errors[name]?.message || `${label} es obligatorio`}
      </span>
    )}
  </div>
);
