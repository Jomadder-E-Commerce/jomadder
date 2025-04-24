export default function Bkash() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 mt-4 "
          onValueChange={(value) => {
            handlePaymentMethodChange({
              ...value,
            });
          }}
        >
          {paymentData?.data?.map((method, index) => (
            <AccordionItem
              key={index}
              value={method}
              className={`bg-card rounded-lg shadow-md w-full ${
                selectedMethod === method._id
                  ? "ring-2 ring-blue-500 rounded-lg"
                  : ""
              }`}
            >
              <AccordionTrigger className={`px-4 py-2 w-full text-xl `}>
                <div
                  key={method._id}
                  className={`flex items-center w-full p-4 rounded-lg cursor-pointer `}
                  onClick={() => handlePaymentMethodChange(method)}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="form-radio h-5 w-5 text-blue-600"
                    checked={selectedMethod === method._id}
                    onChange={() => {}}
                    readOnly
                  />
                  <div className="ml-3 flex-grow">
                    <div className="flex items-center justify-between">
                      {method.image && (
                        <Image
                          unoptimized
                          src={method.image}
                          alt={`${method.name} Logo`}
                          width={60}
                          height={50}
                        />
                      )}
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 bg-background rounded-b-lg">
                {/* bank payment */}
                {selectedMethodName &&
                  selectedMethodName?.toLowerCase() === "bank" && (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full flex flex-col gap-4 mt-4 "
                      onValueChange={(value) => {
                        handlePaymentMethodChange({
                          ...method,
                          ...value,
                        });
                      }}
                    >
                      {method?.bankList?.map((bank, index) => (
                        <AccordionItem
                          key={index}
                          value={bank}
                          className={`bg-card rounded-lg w-full ${
                            bank?.bankName == seletedPaymentInfo?.bankName
                              ? "ring-2 ring-blue-400 rounded-lg"
                              : ""
                          }`}
                        >
                          <AccordionTrigger className="px-4 py-4 flex justify-between hover:bg-muted/50 shadow-md rounded-lg w-full text-xl">
                            <span className=" font-semibol flex items-center">
                              Bank Name:{" "}
                              <span className=" font-normal flex items-center">
                                <Image
                                  unoptimized
                                  src={bank.icon}
                                  alt={`${bank.icon} Logo`}
                                  width={40}
                                  height={30}
                                  className="mx-2"
                                />
                                <span>{bank.bankName}</span>
                              </span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-2 bg-background rounded-b-lg">
                            <div
                              className={`p-4 mt-1 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                                selectedMethod == 120 ? "hidden" : ""
                              }`}
                            >
                              <p className="text-lg font-semibold text-black dark:text-white">
                                Account Infomation:
                              </p>
                              <span className="text-base">
                                <div>Account Name: {bank.accountName}</div>
                                <div>Account Number: {bank.accountNo}</div>
                                <div>Branch: {bank.branch}</div>
                              </span>
                            </div>
                            <div
                              className={`p-3 mt-4 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                                selectedMethod == 120 ? "hidden" : ""
                              }`}
                            >
                              <PayslipUpload
                                charge={bank?.charge}
                                OrderDetailsData={OrderDetailsData}
                                selectedMethod={selectedMethod}
                                selectedImage={selectedImage}
                                setHover={setHover}
                                handleDeleteImage={handleDeleteImage}
                                handleFileChange={handleFileChange}
                                payment={payment}
                              >
                                <div>
                                  <label
                                    htmlFor="referenceNo"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                  >
                                    Reference No:
                                  </label>
                                  <Input
                                    placeholder="Enter your reference code"
                                    name="referenceNo"
                                    id="referenceNo"
                                    key={"referenceNo"}
                                    required
                                    onChange={(e) =>
                                      setSeletedPaymentInfo((prev) => ({
                                        ...prev,
                                        referenceNo: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                                <div className="mt-2">
                                  <label
                                    htmlFor="depositDate"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                  >
                                    Deposit date:
                                  </label>
                                  <Input
                                    placeholder="Enter the deposit date"
                                    name="depositDate"
                                    type="date"
                                    id="depositDate"
                                    required
                                    onChange={(e) =>
                                      setSeletedPaymentInfo((prev) => ({
                                        ...prev,
                                        depositDate: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </PayslipUpload>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                {selectedMethodName &&
                  !["bank", "visa", "online"].includes(
                    selectedMethodName?.toLowerCase()
                  ) && (
                    <>
                      {/* other payment */}
                      <div
                        className={`p-4 mt-1 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                          selectedMethod == 120 ? "hidden" : ""
                        }`}
                      >
                        <p className="text-lg font-semibold text-black dark:text-white">
                          Account Infomation:
                        </p>
                        <span className="text-base">
                          {/* <div>Account Name: {bank.accountName}</div>
                                <div>Account Number: {bank.accountNo}</div>
                                <div>Branch: {bank.branch}</div> */}
                        </span>
                      </div>
                      <div
                        className={`p-3 mt-4 border border-gray-300 rounded-lg bg-gray-100 space-y-1 ${
                          selectedMethod == 120 ? "hidden" : ""
                        }`}
                      >
                        <PayslipUpload
                          charge={method?.charge}
                          OrderDetailsData={OrderDetailsData}
                          selectedMethod={selectedMethod}
                          selectedImage={selectedImage}
                          setHover={setHover}
                          handleDeleteImage={handleDeleteImage}
                          handleFileChange={handleFileChange}
                          payment={payment}
                        >
                          <div>
                            <label
                              htmlFor="referenceNo"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Reference No:
                            </label>
                            <Input
                              placeholder="Enter your reference code"
                              name="referenceNo"
                              id="referenceNo"
                              key={"referenceNo"}
                              required
                              onChange={(e) =>
                                setSeletedPaymentInfo((prev) => ({
                                  ...prev,
                                  referenceNo: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="mt-2">
                            <label
                              htmlFor="depositDate"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Deposit date:
                            </label>
                            <Input
                              placeholder="Enter the deposit date"
                              name="depositDate"
                              type="date"
                              id="depositDate"
                              required
                              onChange={(e) =>
                                setSeletedPaymentInfo((prev) => ({
                                  ...prev,
                                  depositDate: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </PayslipUpload>
                      </div>
                    </>
                  )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </AnimatePresence>
  );
}
