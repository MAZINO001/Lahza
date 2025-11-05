/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import FormField from "@/Components/Form/FormField";
import { Textarea } from "@/components/ui/textarea";
import SelectField from "@/Components/comp-192";
import { Label } from "@/components/ui/label";
import ServiceSelect from "@/Components/Invoice_Quotes/ServiceSelector";
import axios from "axios";

export default function QuoteForm() {
  const [selectedClient, setSelectedClient] = useState("");
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  const clientOptions = clients.map((c) => ({
    name: c.name || c.user?.name,
    id: c.id,
  }));
  const customerData = clients.find(
    (c) => String(c.id) === String(selectedClient)
  );

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/clients`
        );
        setClients(res.data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: "",
      quoteId: "QT-000002",
      quoteDate: "2025-11-04",
      notes: "",
      terms: "",
      items: [
        { service: "", description: "", quantity: 1, rate: 0, amount: 0 },
      ],
      discountValue: 0,
      discountType: "%",
      attachedFile: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const discountType = watch("discountType") || "%";
  const discountValue = watch("discountValue") || 0;

  const addNewRow = () => {
    append({ service: "", description: "", quantity: 1, rate: 0, amount: 0 });
  };

  const deleteRow = (index) => {
    if (fields.length > 1) remove(index);
  };

  const updateItem = (index, fieldName, value) => {
    const numericValue = Number(value) || 0;
    setValue(`items.${index}.${fieldName}`, numericValue);

    const quantity =
      fieldName === "quantity"
        ? numericValue
        : watch(`items.${index}.quantity`) || 1;
    const rate =
      fieldName === "rate" ? numericValue : watch(`items.${index}.rate`) || 0;

    setValue(`items.${index}.amount`, quantity * rate);
  };

  const calculateSubTotal = () =>
    items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const calculateDiscount = () => {
    const value = Number(discountValue) || 0; // ensure it's a number
    if (discountType === "%") {
      return (calculateSubTotal() * value) / 100;
    }
    return value; // assume $ discount
  };

  const calculateTotal = () => calculateSubTotal() - calculateDiscount();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Quote saved and sent!");
  };

  const services = [
    {
      id: "SRV-001",
      name: "Logo Design",
      description: "Crafting a unique visual identity mark.",
      unitPrice: 350,
    },
    {
      id: "SRV-002",
      name: "Website Development",
      description: "Full website build with responsive UI.",
      unitPrice: 2000,
    },
    {
      id: "SRV-003",
      name: "Social Media Management",
      description: "Handling posts, scheduling, and engagement.",
      unitPrice: 750,
    },
    {
      id: "SRV-004",
      name: "Product Photography",
      description: "High-quality shots for catalogs & online stores.",
      unitPrice: 500,
    },
    {
      id: "SRV-005",
      name: "Brand Strategy",
      description: "Positioning, messaging, voice & tone workshop.",
      unitPrice: 1200,
    },
  ];
  return (
    // <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:w-[60%] w-full">
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        New Quote
      </h1>

      <div className="space-y-4">
        <SelectField
          label="Customer"
          items={clientOptions}
          value={selectedClient}
          onChange={(val) => {
            setSelectedClient(val);
            setValue("customerName", val);
          }}
          placeholder="Select or add a customer"
        />
        {customerData && (
          <div className="p-4 border rounded bg-gray-50 text-sm space-y-1 max-w-[300px]">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {customerData.user.name}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {customerData.address}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {customerData.phone}
            </p>
          </div>
        )}

        {/* Quote Info */}
        <FormField
          id="quoteId"
          label="Quote#"
          value={watch("quoteId")}
          disabled
        />
        <FormField
          id="quoteDate"
          label="Quote Date*"
          type="date"
          value={watch("quoteDate")}
          onChange={(e) => setValue("quoteDate", e.target.value)}
        />

        {/* Item Table */}
        <div className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Item Table
          </h2>
          <div className="overflow-x-auto border rounded-md rounded-br-none">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th>ITEM DETAILS</th>
                  <th className="text-right w-32">QUANTITY</th>
                  <th className="text-right w-32">RATE</th>
                  <th className="text-right w-32">AMOUNT</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  const selectedService = watch(`items.${index}.service`);
                  return (
                    <tr key={field.id}>
                      <td>
                        <ServiceSelect
                          services={services}
                          value={selectedService}
                          onChange={(val) => {
                            setValue(`items.${index}.service`, val);
                            const service = services.find((s) => s.id === val);
                            if (service) {
                              setValue(
                                `items.${index}.rate`,
                                service.unitPrice
                              );
                              setValue(
                                `items.${index}.description`,
                                service.description
                              );
                              const quantity =
                                watch(`items.${index}.quantity`) || 1;
                              setValue(
                                `items.${index}.amount`,
                                quantity * service.unitPrice
                              );
                            }
                          }}
                          placeholder="Select a service"
                        />
                        {selectedService && (
                          <Textarea
                            {...register(`items.${index}.description`)}
                            placeholder="Enter service description"
                            className="mt-2 w-full border p-2 rounded text-sm"
                            rows={2}
                          />
                        )}
                      </td>

                      <td>
                        <FormField
                          type="number"
                          value={watch(`items.${index}.quantity`)}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <FormField
                          type="number"
                          value={watch(`items.${index}.rate`)}
                          onChange={(e) =>
                            updateItem(index, "rate", e.target.value)
                          }
                        />
                      </td>

                      <td className="text-right">
                        {(watch(`items.${index}.amount`) || 0).toFixed(2)}
                      </td>

                      <td className="text-center">
                        <button
                          type="button"
                          onClick={() => deleteRow(index)}
                          className="text-red-500"
                        >
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button
              type="button"
              onClick={addNewRow}
              className="flex items-center gap-2 text-white cursor-pointer text-sm font-medium mt-3"
            >
              <Plus size={18} /> Add New Row
            </Button>

            <div className=" border-gray-300 md:w-[50%] w-full px-2 rounded-bl-lg rounded-br-lg border-b border-x ">
              <div className="flex justify-between py-3 text-lg font-semibold">
                <span className="text-gray-800">Total ( $ )</span>
                <span className="text-gray-800">
                  {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Totals */}
        <div className="flex md:flex-row flex-col gap-4 items-end justify-between">
          <div className="w-full">
            <Label htmlFor="notes" className="mb-1">
              Customer Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Enter notes"
              value={watch("notes")}
              onChange={(e) => setValue("notes", e.target.value)}
            />
          </div>
        </div>

        {/* Terms & Attach File */}
        <div className="flex md:flex-row flex-col gap-4 items-start justify-between">
          <div className="md:w-[60%] w-full">
            <Label htmlFor="terms" className="mb-1">
              Terms & Conditions
            </Label>
            <Textarea
              id="terms"
              placeholder="Enter terms"
              rows={4}
              value={watch("terms")}
              onChange={(e) => setValue("terms", e.target.value)}
            />
          </div>
          <div className="md:w-[40%] w-full">
            <FormField
              id="attachedFile"
              label="Attach File"
              type="file"
              onChange={(e) => setValue("attachedFile", e.target.files[0])}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex md:flex-row flex-col justify-end gap-3 mt-8">
          <Button
            type="button"
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => console.log("Draft:", watch())}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded font-medium text-sm hover:bg-blue-600 transition-colors"
          >
            Save and Send
          </Button>
        </div>
      </div>
    </form>
  );
}
