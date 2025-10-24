

export default function SelectField({ label, register, name, options = [], errors , validation}) {
  return (
    <div className="mb-4">
      <label className={`block ${errors[name]?"text-red-700":"text-green-700"}  font-medium mb-2`}>{label}</label>
      <select
      
      
        {...register(name, validation)}
        className={`w-full px-4 py-2 border ${errors[name]?"border-red-300 focus:ring-red-500":"border-green-300 focus:ring-green-500"} rounded-lg focus:outline-none focus:ring-2  focus:border-transparent bg-white`}
      >
        <option value="">Select Option</option>
        {options.map((opt) => (
          <option key={opt} value={opt.replace(' ','')}>{opt}</option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}

      
    </div>
  );
}
