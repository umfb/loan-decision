import { useState, ChangeEvent } from "react";
import FormHeader from "../components/FormHeader";
import NavBar from "../components/NavBar";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/FormSchema";
import MiniHeader from "../components/MiniHeader";
import { MdClose } from "react-icons/md";
import { imageDataType } from "../models/imageData.type";
import { Submit } from "../utils/submit";

export default function Form() {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
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

  function handleSignature(event: ChangeEvent<HTMLInputElement>) {
    setSignatureError("");
    setSignature(true);
    if (!event.target.files) return;
    setSignaturePic(URL.createObjectURL(event.target.files[0]));
    event.target.files[0];
    const name = event.target.name;
    const files = event.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise<imageDataType>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            base64: reader.result?.toString().split(",")[1] || "",
            mimeType: file.type,
            name,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises)
      .then((images: imageDataType[]) => {
        setSignatureFile(images);
        console.log(signatureFile);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(event.target.files[0].name);
  }

  function handleRemoveSignature() {
    console.log("removed");

    setSignature(false);
    setSignaturePic("");
  }

  function handleEnter() {
    setHover(true);
  }

  function handleLeave() {
    setHover(false);
  }

  const [signature, setSignature] = useState(false);
  const [signatureError, setSignatureError] = useState("no images");
  const [signatureFile, setSignatureFile] = useState<imageDataType[]>([]);
  const [signaturePic, setSignaturePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(false);

  function onSubmit(data: Record<string, any>) {
    if (signatureError) return;
    Submit(data, signatureFile, reset, setIsLoading, setSignature);
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
                type="date"
                name="Application Date"
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
                type="date"
                id="business-visit-date"
                name="Business Visit Date"
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
                type="date"
                id="home-visit-date"
                name="Home Visit Date"
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
                type="date"
                id="credit-committee-date"
                name="Credit Committee Date"
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
                name="Applicant Spouse DOB"
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
                name="Business Legal Status"
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
                name="Business Activity Age"
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
                name="Business Address Age"
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
                      name={`Loan History.${index}.Loan Amount`}
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
                      name={`Loan History.${index}.Tenor`}
                      placeholder="Tenor"
                      className="input-custom"
                    />
                    {errors["Loan History"] &&
                      errors["Loan History"][index] &&
                      errors["Loan History"][index]["Tenor"] && (
                        <p className="error-message">
                          {errors["Loan History"][index]["Tenor"].message}
                        </p>
                      )}
                  </div>
                  <div className="wrapper-custom col-12 col-lg-4">
                    <label htmlFor="installment" className="label-custom">
                      Installment
                    </label>
                    <input
                      {...register(`Loan History.${index}.Installment`)}
                      type="text"
                      id="installment"
                      name={`Loan History.${index}.Installment`}
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
                <div className="row mt-3">
                  <div className="wrapper-custom col-12 col-lg-6">
                    <label htmlFor="overdue" className="label-custom">
                      Days in Overdue
                    </label>
                    <input
                      {...register(`Loan History.${index}.Days in Overdue`)}
                      type="text"
                      id="overdue"
                      name={`Loan History.${index}.Days in Overdue`}
                      placeholder="Days in Overdue"
                      className="input-custom"
                    />
                    {errors["Loan History"] &&
                      errors["Loan History"][index] &&
                      errors["Loan History"][index]["Days in Overdue"] && (
                        <p className="error-message">
                          {
                            errors["Loan History"][index]["Days in Overdue"]
                              .message
                          }
                        </p>
                      )}
                  </div>
                  <div className="wrapper-custom col-12 col-lg-6">
                    <label htmlFor="year" className="label-custom">
                      Year
                    </label>
                    <input
                      {...register(`Loan History.${index}.Year`)}
                      type=""
                      id="year"
                      name={`Loan History.${index}.Year`}
                      className="input-custom"
                    />
                    {errors["Loan History"] &&
                      errors["Loan History"][index] &&
                      errors["Loan History"][index].Year && (
                        <p className="error-message">
                          {errors["Loan History"][index]["Year"].message}
                        </p>
                      )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={index + 1 === 1}
                onClick={() => remove(index)}
                className="bg-red-500 disabled:bg-red-200 disabled:cursor-not-allowed text-white py-1 px-3 active:bg-red-600"
              >
                Remove loan history
              </button>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={() =>
                append({
                  "Loan Amount": "",
                  Tenor: "",
                  Installment: "",
                  "Days in Overdue": "",
                  Year: "",
                })
              }
              type="button"
              className="bg-green-500 text-white py-1 px-3 active:bg-green-600"
            >
              Add loan history
            </button>
          </div>
          <div className="py-2">
            <MiniHeader title="LOAN PROPOSAL" />
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="loan-approved" className="label-custom">
                Credit Committee Approval?
              </label>
              <select
                {...register("Loan Approved")}
                name="Loan Approved"
                id="loan-approved"
                className="input-custom"
              >
                <option className="bg-gray-300" value="">
                  --Yes or No--
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors["Loan Approved"] && (
                <p className="error-message">
                  {errors["Loan Approved"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="proposed-amount" className="label-custom">
                Proposed Amount
              </label>
              <input
                {...register("Proposed Amount")}
                type="text"
                id="proposed-amount"
                name="Proposed Amount"
                placeholder="Proposed Amount"
                className="input-custom"
              />
              {errors["Proposed Amount"] && (
                <p className="error-message">
                  {errors["Proposed Amount"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="applied-amount" className="label-custom">
                Applied Amount
              </label>
              <input
                {...register("Applied Amount")}
                type="text"
                id="applied-amount"
                name="Applied Amount"
                placeholder="Applied Amount"
                className="input-custom"
              />
              {errors["Applied Amount"] && (
                <p className="error-message">
                  {errors["Applied Amount"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="proposed-tenor" className="label-custom">
                Proposed Tenor
              </label>
              <input
                {...register("Proposed Tenor")}
                type="text"
                id="proposed-tenor"
                name="Proposed Tenor"
                placeholder="Proposed Tenor"
                className="input-custom"
              />
              {errors["Proposed Tenor"] && (
                <p className="error-message">
                  {errors["Proposed Tenor"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="loan-cycle" className="label-custom">
                Loan Cycle
              </label>
              <input
                {...register("Loan Cycle")}
                type="text"
                id="loan-cycle"
                name="Loan Cycle"
                placeholder="Loan Cycle"
                className="input-custom"
              />
              {errors["Loan Cycle"] && (
                <p className="error-message">{errors["Loan Cycle"].message}</p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="proposed-installment" className="label-custom">
                Proposed Installment
              </label>
              <input
                {...register("Proposed Installment")}
                type="text"
                id="proposed-installment"
                name="Proposed Installment"
                placeholder="Proposed Installment"
                className="input-custom"
              />
              {errors["Proposed Installment"] && (
                <p className="error-message">
                  {errors["Proposed Installment"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="applied-tenor" className="label-custom">
                Applied Tenor
              </label>
              <input
                {...register("Applied Tenor")}
                type="text"
                id="applied-tenor"
                name="Applied Tenor"
                placeholder="Applied Tenor"
                className="input-custom"
              />
              {errors["Applied Tenor"] && (
                <p className="error-message">
                  {errors["Applied Tenor"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="can-easily-pay" className="label-custom">
                Can Easily Pay
              </label>
              <input
                {...register("Can easily pay")}
                type="text"
                id="can-easily-pay"
                name="Can easily pay"
                placeholder="Can Easily Pay"
                className="input-custom"
              />
              {errors["Can easily pay"] && (
                <p className="error-message">
                  {errors["Can easily pay"].message}
                </p>
              )}
            </div>
          </div>
          <div className="py-2">
            <MiniHeader title="CREDIT COMMITTEE DECISION" />
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="approved" className="label-custom">
                Loan Approved?
              </label>
              <select
                {...register("Credit Committee Approved")}
                name="Credit Committee Approved"
                id="approved"
                className="input-custom"
              >
                <option className="bg-gray-300" value="">
                  --Yes or No--
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors["Credit Committee Approved"] && (
                <p className="error-message">
                  {errors["Credit Committee Approved"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="approved-amount" className="label-custom">
                Approved Amount
              </label>
              <input
                {...register("Credit Committee Approved Amount")}
                type="text"
                id="approved-amount"
                name="Approved Amount"
                placeholder="Approved Amount"
                className="input-custom"
              />
              {errors["Credit Committee Approved Amount"] && (
                <p className="error-message">
                  {errors["Credit Committee Approved Amount"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="approved-installment" className="label-custom">
                Approved Installment
              </label>
              <input
                {...register("Credit Committee Approved Installment")}
                type="text"
                id="approved-installment"
                name="Approved Installment"
                placeholder="Approved Installment"
                className="input-custom"
              />
              {errors["Credit Committee Approved Installment"] && (
                <p className="error-message">
                  {errors["Credit Committee Approved Installment"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="interest-rate" className="label-custom">
                Interest Rate
              </label>
              <input
                {...register("Credit Committee Interest Rate")}
                type="text"
                id="interest-rate"
                name="Interest Rate"
                placeholder="Interest Rate"
                className="input-custom"
              />
              {errors["Credit Committee Interest Rate"] && (
                <p className="error-message">
                  {errors["Credit Committee Interest Rate"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="approved-tenor" className="label-custom">
                Approved Tenor
              </label>
              <input
                {...register("Credit Committee Approved Tenor")}
                type="text"
                id="approved-tenor"
                name="Approved Tenor"
                placeholder="Approved Tenor"
                className="input-custom"
              />
              {errors["Credit Committee Approved Tenor"] && (
                <p className="error-message">
                  {errors["Credit Committee Approved Tenor"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-6">
              <label htmlFor="postponement" className="label-custom">
                Postponment
              </label>
              <input
                {...register("Credit Committee Postponement")}
                type="text"
                id="postponement"
                name="Credit Committee Postponement"
                placeholder="Credit Committee Postponement"
                className="input-custom"
              />
              {errors["Credit Committee Postponement"] && (
                <p className="error-message">
                  {errors["Credit Committee Postponement"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12">
              <label htmlFor="loan-purpose" className="label-custom">
                Loan Purpose
              </label>
              <input
                {...register("Credit Committee Loan Purpose")}
                type="text"
                id="loan-purpose"
                name="Loan Purpose"
                placeholder="Loan Purpose"
                className="input-custom"
              />
              {errors["Credit Committee Loan Purpose"] && (
                <p className="error-message">
                  {errors["Credit Committee Loan Purpose"].message}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="wrapper-custom col-12 col-lg-4">
              <label
                htmlFor="committee-size"
                className="label-custom w-full truncate"
              >
                Number of Credit Committee
              </label>
              <input
                {...register("Credit Committe Size")}
                type="text"
                id="committee-size"
                placeholder="Committe Size"
                className="input-custom"
              />
              {errors["Credit Committe Size"] && (
                <p className="error-message">
                  {errors["Credit Committe Size"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="in-favour" className="label-custom">
                In Favour
              </label>
              <input
                {...register("Credit Committe in Favour")}
                type="text"
                id="in-favour"
                placeholder="In Favour"
                className="input-custom"
              />
              {errors["Credit Committe in Favour"] && (
                <p className="error-message">
                  {errors["Credit Committe in Favour"].message}
                </p>
              )}
            </div>
            <div className="wrapper-custom col-12 col-lg-4">
              <label htmlFor="against" className="label-custom">
                Against
              </label>
              <input
                {...register("Credit Committe Against")}
                type="text"
                id="against"
                placeholder="Against"
                className="input-custom"
              />
              {errors["Credit Committe Against"] && (
                <p className="error-message">
                  {errors["Credit Committe Against"].message}
                </p>
              )}
            </div>
          </div>
          <div className="wrapper-custom">
            {!signature ? (
              <label
                className="lg:w-[30%] w-[250px] h-60 border-dashed border-2 border-gray-700 d-flex text-center justify-center items-center hover:bg-slate-100 cursor-pointer shadow-md"
                htmlFor="signature-witness"
              >
                <span>Signature</span>
              </label>
            ) : (
              <div
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className="relative lg:w-[30%] w-[250px] h-60 bg-gray-200 shadow-md"
              >
                {hover && (
                  <button
                    onClick={() => handleRemoveSignature()}
                    type="button"
                    className="text-white absolute top-2 bg-red-600 right-2 rounded-full"
                  >
                    <MdClose size="24" className="text-white" />
                  </button>
                )}
                <img
                  className="object-cover h-60"
                  width="100%"
                  src={signaturePic}
                  alt="Witness Signature"
                />
              </div>
            )}

            <input
              className="hidden"
              type="file"
              name="Witness Signature"
              id="signature-witness"
              accept="image/*"
              onChange={(e) => handleSignature(e)}
            />
          </div>
          <button
            disabled={isLoading}
            className="bg-[#800] text-white py-2 rounded disabled:bg-red-300 disabled:cursor-not-allowed flex justify-center items-center"
            type="submit"
          >
            {isLoading ? (
              <div className="border-4 border-t-transparent border-[#800] animate-spin h-6 w-6 rounded-full"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
