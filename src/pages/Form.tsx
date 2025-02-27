import FormHeader from "../components/FormHeader";
import NavBar from "../components/NavBar";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/FormSchema";
import MiniHeader from "../components/MiniHeader";

export default function Form() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      "Loan History": [
        {
          "Loan Amount": "",
          Tenor: "",
          Installment: "",
          "Days in Overdue": "",
          Year: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Loan History",
  });

  function onSubmit(data: Record<string, any>) {
    console.log(data);
  }

  return (
    <div className="border mx-auto md:p-5 py-5 overflow-auto h-screen relative">
      <div className="fixed top-0 left-0 text-center h-[150px] bg-white z-10 w-full shadow-md">
        <NavBar />
      </div>
      <div className="h-fit pb-10 lg:w-[70%] w-full mx-auto mt-[150px] border-1 border-[#800] md:px-8 px-2 rounded-lg">
        <FormHeader title="LOAN DECISION" />
        <form
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.error("errors:", errors)
          )}
          className="flex flex-col gap-3 mx-auto md:px-3 mt-3 inter"
        >
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="application-date" className="label-custom">
                Application Date
              </label>
              <input
                {...register("Application Date")}
                type="text"
                name="Application Date"
                placeholder="Application Date"
                id="application-date"
                className="input-custom"
              />
              {errors["Application Date"] && (
                <p className="error-message">
                  {errors["Application Date"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="business-visit-date" className="label-custom">
                Business Visit Date
              </label>
              <input
                {...register("Business Visit Date")}
                type="text"
                id="business-visit-date"
                name="Business Visit Date"
                placeholder="Business Visit Date"
                className="input-custom"
              />
              {errors["Business Visit Date"] && (
                <p className="error-message">
                  {errors["Business Visit Date"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="home-visit-date" className="label-custom">
                Home Visit Date
              </label>
              <input
                {...register("Home Visit Date")}
                type="text"
                id="home-visit-date"
                name="Home Visit Date"
                placeholder="Home Visit Date"
                className="input-custom"
              />
              {errors["Home Visit Date"] && (
                <p className="error-message">
                  {errors["Home Visit Date"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="credit-committee-date" className="label-custom">
                Credit Committe Date
              </label>
              <input
                {...register("Credit Committee Date")}
                type="text"
                id="credit-committee-date"
                name="Credit Committee Date"
                placeholder="Credit Committee Date"
                className="input-custom"
              />
              {errors["Credit Committee Date"] && (
                <p className="error-message">
                  {errors["Credit Committee Date"].message}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <MiniHeader title="APPLICANT" />
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="applicant-name" className="label-custom">
                Name
              </label>
              <input
                {...register("Applicant Name")}
                type="text"
                id="applicant-name"
                name="Applicant Name"
                placeholder="Applicant Name"
                className="input-custom"
              />
              {errors["Applicant Name"] && (
                <p className="error-message">
                  {errors["Applicant Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="applicant-dob" className="label-custom">
                Date of Birth (Applicant)
              </label>
              <input
                {...register("Applicant DOB")}
                type="date"
                id="applicant-dob"
                name="Applicant DOB"
                className="input-custom"
              />
              {errors["Applicant DOB"] && (
                <p className="error-message">
                  {errors["Applicant DOB"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="home-address" className="label-custom">
                Home Address
              </label>
              <input
                {...register("Applicant Home Address")}
                type="text"
                id="home-address"
                name="Applicant Home Address"
                placeholder="Home Address"
                className="input-custom"
              />
              {errors["Applicant Home Address"] && (
                <p className="error-message">
                  {errors["Applicant Home Address"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label
                htmlFor="applicant-marital-status"
                className="label-custom"
              >
                Marital Status
              </label>
              <input
                {...register("Applicant Marital Status")}
                type="text"
                id="applicant-marital-status"
                name="Applicant Marital Status"
                placeholder="Applicant Marital Status"
                className="input-custom"
              />
              {errors["Applicant Marital Status"] && (
                <p className="error-message">
                  {errors["Applicant Marital Status"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="spouse-name" className="label-custom">
                Spouse Name
              </label>
              <input
                {...register("Applicant Spouse Name")}
                type="text"
                id="spouse-name"
                name="Spouse Name"
                placeholder="Spouse Name"
                className="input-custom"
              />
              {errors["Applicant Spouse Name"] && (
                <p className="error-message">
                  {errors["Applicant Spouse Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="spouse-dob" className="label-custom">
                Date of Birth
              </label>
              <input
                {...register("Applicant Spouse DOB")}
                type="date"
                id="spouse-dob"
                name="Spouse Date of Birth"
                className="input-custom"
              />
              {errors["Applicant Spouse DOB"] && (
                <p className="error-message">
                  {errors["Applicant Spouse DOB"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="co-signor" className="label-custom">
                Co-signor
              </label>
              <input
                {...register("Co-signor")}
                type="text"
                id="co-signor"
                name="Co-signor"
                placeholder="Co-signor"
                className="input-custom"
              />
              {errors["Co-signor"] && (
                <p className="error-message">{errors["Co-signor"].message}</p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="relationship" className="label-custom">
                Relationship
              </label>
              <input
                {...register("Co-signor Relationship")}
                type="text"
                id="relationship"
                name="Co-signor Relationship"
                placeholder="Relationship"
                className="input-custom"
              />
              {errors["Co-signor Relationship"] && (
                <p className="error-message">
                  {errors["Co-signor Relationship"].message}
                </p>
              )}
            </div>
          </div>
          <div className="py-2">
            <MiniHeader title="BUSINESS SUMMARY" />
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="business-name" className="label-custom">
                Business Name
              </label>
              <input
                {...register("Business Name")}
                type="text"
                id="business-name"
                name="Business Name"
                placeholder="Business Name"
                className="input-custom"
              />
              {errors["Business Name"] && (
                <p className="error-message">
                  {errors["Business Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="legal-status" className="label-custom">
                Legal Status
              </label>
              <input
                {...register("Business Legal Status")}
                type="text"
                id="legal-status"
                name="Legal Status"
                placeholder="Legal Status"
                className="input-custom"
              />
              {errors["Business Legal Status"] && (
                <p className="error-message">
                  {errors["Business Legal Status"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="business-activity" className="label-custom">
                Business Activity
              </label>
              <input
                {...register("Business Activity")}
                type="text"
                id="business-activity"
                name="Business Activity"
                placeholder="Business Activity"
                className="input-custom"
              />
              {errors["Business Activity"] && (
                <p className="error-message">
                  {errors["Business Activity"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="act-since" className="label-custom">
                Since
              </label>
              <input
                {...register("Business Activity Age")}
                type="date"
                id="act-since"
                name="Activity Since"
                className="input-custom"
              />
              {errors["Business Activity Age"] && (
                <p className="error-message">
                  {errors["Business Activity Age"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="business-address" className="label-custom">
                Business Address
              </label>
              <input
                {...register("Business Address")}
                type="text"
                id="business-address"
                name="Business Address"
                placeholder="Business Address"
                className="input-custom"
              />
              {errors["Business Address"] && (
                <p className="error-message">
                  {errors["Business Address"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="add-since" className="label-custom">
                Since
              </label>
              <input
                {...register("Business Address Age")}
                type="date"
                id="add-since"
                name="Address Since"
                className="input-custom"
              />
              {errors["Business Address Age"] && (
                <p className="error-message">
                  {errors["Business Address Age"].message}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <MiniHeader title="GUARANTOR DETAILS" />
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="guarantor-name" className="label-custom">
                Name
              </label>
              <input
                {...register("Guarantor Name")}
                type="text"
                id="guarantor-name"
                name="Guarantor Name"
                placeholder="Name"
                className="input-custom"
              />
              {errors["Guarantor Name"] && (
                <p className="error-message">
                  {errors["Guarantor Name"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="g-marital-status" className="label-custom">
                Marital Status
              </label>
              <input
                {...register("Guarantor Marital Status")}
                type="text"
                id="g-marital-status"
                name="Guarantor Marital Status"
                placeholder="Marital Status"
                className="input-custom"
              />
              {errors["Guarantor Marital Status"] && (
                <p className="error-message">
                  {errors["Guarantor Marital Status"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="guarantor-activity" className="label-custom">
                Activity
              </label>
              <input
                {...register("Guarantor Activity")}
                type="text"
                id="guarantor-activity"
                name="Guarantor Activity"
                placeholder="Activity"
                className="input-custom"
              />
              {errors["Guarantor Activity"] && (
                <p className="error-message">
                  {errors["Guarantor Activity"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="g-since" className="label-custom">
                Since
              </label>
              <input
                {...register("Guarantor Activity Age")}
                type="date"
                id="g-since"
                name="Guarantor Activity Age"
                className="input-custom"
              />
              {errors["Guarantor Activity Age"] && (
                <p className="error-message">
                  {errors["Guarantor Activity Age"].message}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <MiniHeader title="COLLATERAL SUMMARY" />
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="hg" className="label-custom">
                HG
              </label>
              <input
                {...register("HG")}
                type="text"
                id="hg"
                name="HG"
                placeholder="HG"
                className="input-custom"
              />
              {errors["HG"] && (
                <p className="error-message">{errors["HG"].message}</p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="ba" className="label-custom">
                BA
              </label>
              <input
                {...register("BA")}
                type="text"
                id="ba"
                name="BA"
                placeholder="BA"
                className="input-custom"
              />
              {errors["BA"] && (
                <p className="error-message">{errors["BA"].message}</p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="inv" className="label-custom">
                INV
              </label>
              <input
                {...register("INV")}
                type="text"
                id="inv"
                name="INV"
                placeholder="INV"
                className="input-custom"
              />
              {errors["INV"] && (
                <p className="error-message">{errors["INV"].message}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="vmg" className="label-custom">
                VMG
              </label>
              <input
                {...register("VMG")}
                type="text"
                id="vmg"
                name="VMG"
                placeholder="VMG"
                className="input-custom"
              />
              {errors["VMG"] && (
                <p className="error-message">{errors["VMG"].message}</p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="lbmg" className="label-custom">
                LBMG
              </label>
              <input
                {...register("LBMG")}
                type="text"
                id="lbmg"
                name="LBMG"
                placeholder="LBMG"
                className="input-custom"
              />
              {errors["LBMG"] && (
                <p className="error-message">{errors["LBMG"].message}</p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="others" className="label-custom">
                Others
              </label>
              <input
                {...register("Others")}
                type="text"
                id="others"
                name="Others"
                placeholder="Others"
                className="input-custom"
              />
              {errors["Others"] && (
                <p className="error-message">{errors["Others"].message}</p>
              )}
            </div>
          </div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="my-2">
                <MiniHeader
                  title={`LOAN HISTORY WITH UMFB SUMMARY ${index + 1}`}
                />
                <div className="row">
                  <div className="wrapper-custom col-12 col-lg-4">
                    <label htmlFor="loan-amount" className="label-custom">
                      Loan Amount
                    </label>
                    <input
                      {...register(`Loan History.${index}.Loan Amount`)}
                      type="text"
                      id="loan-amount"
                      name="Loan Amount"
                      placeholder="Loan Amount"
                      className="input-custom"
                    />
                    {errors["Loan History"] &&
                      errors["Loan History"][index] &&
                      errors["Loan History"][index]["Loan Amount"] && (
                        <p className="error-message">
                          {errors["Loan History"][index]["Loan Amount"].message}
                        </p>
                      )}
                  </div>
                  <div className="wrapper-custom col-12 col-lg-4">
                    <label htmlFor="tenor" className="label-custom">
                      Tenor
                    </label>
                    <input
                      {...register(`Loan History.${index}.Tenor`)}
                      type="text"
                      id="tenor"
                      name="Tenor"
                      placeholder="Tenor"
                      className="input custom"
                    />
                    {errors["Loan History"] &&
                      errors["Loan History"][index] &&
                      errors["Loan History"][index]["Tenor"] && (
                        <p className="error-message">
                          {errors["Loan History"][index]["Tenor"].message}
                        </p>
                      )}
                  </div>
                  <div className="wrapper custom col-12 col-lg-4">
                    <label htmlFor="installment" className="label-custom">
                      Installment
                    </label>
                    <input
                      {...register(`Loan History.${index}.Installment`)}
                      type="text"
                      id="installment"
                      name="Installment"
                      placeholder="Installment"
                      className="input-custom"
                    />
                    {errors["Loan History"] &&
                      errors["Loan History"][index] &&
                      errors["Loan History"][index]["Installment"] && (
                        <p className="error-message">
                          {errors["Loan History"][index]["Installment"].message}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
