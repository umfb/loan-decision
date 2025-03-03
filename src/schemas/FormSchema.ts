import * as z from "zod";

export const FormSchema = z
  .object({
    "Application Date": z.string().nonempty("This field is required"),
    "Business Visit Date": z.string().nonempty("This field is required"),
    "Home Visit Date": z.string().nonempty("This field is required"),
    "Credit Committee Date": z.string().nonempty("This field is required"),
    "Applicant Name": z.string().nonempty("This field is required"),
    "Applicant DOB": z.string().nonempty("This field is required"),
    "Applicant Spouse Name": z.string().optional(),
    "Applicant Spouse DOB": z.string().nonempty("This field is required"),
    "Applicant Home Address": z.string().nonempty("This field is required"),
    "Applicant Marital Status": z.string().nonempty("This field is required"),
    "Co-signor": z.string().nonempty("This field is required"),
    "Co-signor Relationship": z.string().nonempty("This field is required"),
    "Business Name": z.string().nonempty("This field is required"),
    "Business Legal Status": z.string().nonempty("This field is required"),
    "Business Activity": z.string().nonempty("This field is required"),
    "Business Activity Age": z.string().nonempty("This field is required"),
    "Business Address": z.string().nonempty("This field is required"),
    "Business Address Age": z.string().nonempty("This field is required"),
    "Guarantor Name": z.string().nonempty("This field is required"),
    "Guarantor Marital Status": z.string().nonempty("This field is required"),
    "Guarantor Activity": z.string().nonempty("This field is required"),
    "Guarantor Activity Age": z.string().nonempty("This field is required"),
    HG: z.string().nonempty("This field is required"),
    BA: z.string().nonempty("This field is required"),
    INV: z.string().nonempty("This field is required"),
    VMG: z.string().nonempty("This field is required"),
    LBMG: z.string().nonempty("This field is required"),
    Others: z.string().nonempty("This field is required"),
    "Loan History": z.array(
      z.object({
        "Loan Amount": z.string().nonempty("This field is required"),
        Tenor: z.string().nonempty("This field is required"),
        Installment: z.string().nonempty("This field is required"),
        "Days in Overdue": z.string().nonempty("This field is required"),
        Year: z.string().nonempty("This field is required"),
      })
    ),
    "Loan Approved": z.string().nonempty("This field is required"),
    "Proposed Amount": z.string().optional(),
    "Applied Amount": z.string().optional(),
    "Proposed Tenor": z.string().optional(),
    "Applied Tenor": z.string().optional(),
    "Proposed Installment": z.string().optional(),
    "Can easily pay": z.string().optional(),
    "Loan Cycle": z.string().optional(),
    "Credit Committee Approved": z.string().nonempty("This field is required"),
    "Credit Committee Approved Amount": z.string().optional(),
    "Credit Committee Approved Tenor": z.string().optional(),
    "Credit Committee Interest Rate": z.string().optional(),
    "Credit Committee Approved Installment": z.string().optional(),
    "Credit Committee Loan Purpose": z.string().optional(),
    "Credit Committee Postponement": z.string().optional(),
    "Credit Committe Size": z.string().nonempty("This field is required"),
    "Credit Committe in Favour": z.string().nonempty("This field is required"),
    "Credit Committe Against": z.string().nonempty("This field is required"),
  })
  .superRefine((data, ctx) => {
    if (data["Loan Approved"] === "Yes") {
      const requiredFields = [
        "Proposed Amount",
        "Applied Amount",
        "Proposed Tenor",
        "Applied Tenor",
        "Proposed Installment",
        "Can easily pay",
        "Loan Cycle",
      ];

      requiredFields.forEach((field) => {
        if (!data[field as keyof typeof data]) {
          ctx.addIssue({
            path: [field],
            message: `${field} is required when loan is approved`,
            code: "custom",
          });
          console.log(field);
        }
      });
    }
  });

export type FormValues = z.infer<typeof FormSchema>;
