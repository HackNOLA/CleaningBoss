import type { NextPage } from 'next'
import { useCallback } from 'react'

const AddAUser: NextPage = () => {
  const onLeadingIconContainerClick = useCallback(() => {
    // Please sync "Users" to the project
  }, [])

  const onButtonSecondaryContainerClick = useCallback(() => {
    // Please sync "Single Location - Admin" to the project
  }, [])

  const onButtonMainContainerClick = useCallback(() => {
    // Please sync "Single Location - Admin" to the project
  }, [])

  return (
    <div className="relative rounded-2xl bg-whitesmoke w-full h-[852px] overflow-y-auto text-center text-base text-midnightblue font-text-sm-medium">
      <div className="absolute top-[144px] left-[16px] w-[361px] h-[1693px] flex flex-col items-start justify-start gap-[32px] text-left">
        <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch relative tracking-[0.5px] leading-[100%] font-medium">
              First Name
            </div>
            <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 flex flex-row items-center justify-start py-2 px-4 text-steelblue border-[1px] border-solid border-lightslategray">
              <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                  alt=""
                  src="/eyeoff.svg"
                />
                <div className="flex-1 relative leading-[24px]">First Name</div>
                <img
                  className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                  alt=""
                  src="/eyeoff2.svg"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch relative tracking-[0.5px] leading-[100%] font-medium">
              Last Name
            </div>
            <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 flex flex-row items-center justify-start py-2 px-4 text-steelblue border-[1px] border-solid border-lightslategray">
              <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                  alt=""
                  src="/eyeoff.svg"
                />
                <div className="flex-1 relative leading-[24px]">Last Name</div>
                <img
                  className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                  alt=""
                  src="/eyeoff2.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            Email Address
          </div>
          <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 flex flex-row items-center justify-start py-2 px-4 text-steelblue border-[1px] border-solid border-lightslategray">
            <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
              <img
                className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                alt=""
                src="/eyeoff.svg"
              />
              <div className="flex-1 relative leading-[24px]">email@domain.com</div>
              <img
                className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                alt=""
                src="/eyeoff1.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            Photo
          </div>
          <div className="flex flex-row items-center justify-start gap-[32px] text-sm text-limegreen-200">
            <img
              className="relative rounded-[200px] w-[120px] h-[120px] overflow-hidden shrink-0"
              alt=""
              src="/photo.svg"
            />
            <div className="flex flex-col items-start justify-start gap-[16px]">
              <div className="flex flex-row items-end justify-start gap-[8px]">
                <img
                  className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/plus.svg"
                />
                <div className="relative leading-[120%] font-semibold">Add Photo</div>
              </div>
              <div className="flex flex-row items-end justify-start gap-[8px]">
                <img
                  className="relative rounded-81xl w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/plus.svg"
                />
                <div className="relative leading-[120%] font-semibold">Choose Color</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[201px] h-[88px] flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium">Language</div>
          <div className="rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border w-[201px] h-14 overflow-hidden shrink-0 flex flex-row items-center justify-start py-2 px-4 text-steelblue border-[1px] border-solid border-lightslategray">
            <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
              <img
                className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                alt=""
                src="/eyeoff.svg"
              />
              <div className="flex-1 relative leading-[24px]">Select</div>
              <img
                className="relative w-[18px] h-[18px] overflow-hidden shrink-0"
                alt=""
                src="/chevrondown.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            Password
          </div>
          <div className="flex flex-col items-start justify-start gap-[16px] text-darkslategray-200">
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Set for User</div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Send Email</div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Don’t Set</div>
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 hidden flex-row items-center justify-start py-2 pr-4 pl-3 text-steelblue border-[1px] border-solid border-lightslategray">
            <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
              <img className="relative w-8 h-8 overflow-hidden shrink-0" alt="" src="/icon.svg" />
              <div className="flex-1 relative leading-[24px]">Search Location</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
                alt=""
                src="/x.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            User Type
          </div>
          <div className="flex flex-col items-start justify-start gap-[16px] text-darkslategray-200">
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Cleaner</div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Supervisor</div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Admin</div>
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 hidden flex-row items-center justify-start py-2 pr-4 pl-3 text-steelblue border-[1px] border-solid border-lightslategray">
            <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
              <img className="relative w-8 h-8 overflow-hidden shrink-0" alt="" src="/icon.svg" />
              <div className="flex-1 relative leading-[24px]">Search Location</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
                alt=""
                src="/x.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            Calculate Drive Time Between Shifts
          </div>
          <div className="flex flex-col items-start justify-start gap-[16px] text-darkslategray-200">
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Yes</div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">No</div>
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 hidden flex-row items-center justify-start py-2 pr-4 pl-3 text-steelblue border-[1px] border-solid border-lightslategray">
            <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
              <img className="relative w-8 h-8 overflow-hidden shrink-0" alt="" src="/icon.svg" />
              <div className="flex-1 relative leading-[24px]">Search Location</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
                alt=""
                src="/x.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            Require Time Trials
          </div>
          <div className="flex flex-col items-start justify-start gap-[16px] text-darkslategray-200">
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">Yes</div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative rounded-lg w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/checbox.svg"
              />
              <div className="relative leading-[24px]">No</div>
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden shrink-0 hidden flex-row items-center justify-start py-2 pr-4 pl-3 text-steelblue border-[1px] border-solid border-lightslategray">
            <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
              <img className="relative w-8 h-8 overflow-hidden shrink-0" alt="" src="/icon.svg" />
              <div className="flex-1 relative leading-[24px]">Search Location</div>
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
                alt=""
                src="/x.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-darkslategray-200">
          <div className="w-[361px] flex flex-row items-start justify-between text-midnightblue">
            <div className="relative tracking-[0.5px] leading-[100%] font-medium">Locations</div>
            <div className="flex flex-row items-end justify-start gap-[8px] text-sm text-limegreen-200">
              <img
                className="relative rounded-81xl w-[18px] h-[18px] overflow-hidden shrink-0"
                alt=""
                src="/plus1.svg"
              />
              <div className="relative leading-[120%] font-semibold">Add Location</div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[8px]">
            <div className="relative leading-[24px] font-medium">Andrews Insurance</div>
            <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/xcircle.svg" />
          </div>
          <div className="flex flex-row items-start justify-start gap-[8px]">
            <div className="relative leading-[24px] font-medium">First baptist church</div>
            <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/xcircle.svg" />
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <div className="relative tracking-[0.5px] leading-[100%] font-medium flex items-center w-[342px]">
            Availability
          </div>
          <div className="w-[361px] flex flex-row items-start justify-between text-center text-sm text-darkslategray-100">
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] w-10 h-10">
              <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_12px)] leading-[20px] font-medium inline-block w-6">
                Su
              </div>
            </div>
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] box-border w-[42px] h-[42px] border-[2px] border-solid border-mediumslateblue">
              <div className="absolute top-[calc(50%_-_11px)] left-[calc(50%_-_13px)] leading-[20px] font-medium inline-block w-6">
                Mo
              </div>
            </div>
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] w-10 h-10">
              <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_12px)] leading-[20px] font-medium inline-block w-6">
                Tu
              </div>
            </div>
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] box-border w-[42px] h-[42px] border-[2px] border-solid border-mediumslateblue">
              <div className="absolute top-[calc(50%_-_11px)] left-[calc(50%_-_13px)] leading-[20px] font-medium inline-block w-6">
                We
              </div>
            </div>
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] w-10 h-10">
              <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_12px)] leading-[20px] font-medium inline-block w-6">
                Th
              </div>
            </div>
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] box-border w-[42px] h-[42px] border-[2px] border-solid border-mediumslateblue">
              <div className="absolute top-[calc(50%_-_11px)] left-[calc(50%_-_13px)] leading-[20px] font-medium inline-block w-6">
                Fr
              </div>
            </div>
            <div className="relative rounded-xl bg-base-white shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)] w-10 h-10">
              <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_12px)] leading-[20px] font-medium inline-block w-6">
                Sat
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="w-[361px] flex flex-row items-start justify-between">
              <div className="relative tracking-[0.5px] leading-[100%]">Monday</div>
              <div className="flex flex-row items-end justify-start gap-[8px] text-sm text-limegreen-200">
                <img
                  className="relative rounded-81xl w-[18px] h-[18px] overflow-hidden shrink-0"
                  alt=""
                  src="/plus1.svg"
                />
                <div className="relative leading-[120%] font-semibold">Add Time</div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[16px] text-steelblue">
              <div className="flex-1 rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden flex flex-row items-center justify-start py-2 px-4 border-[1px] border-solid border-lightslategray">
                <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff.svg"
                  />
                  <div className="flex-1 relative leading-[24px]">Until</div>
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff2.svg"
                  />
                </div>
              </div>
              <div className="flex-1 rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden flex flex-row items-center justify-start py-2 px-4 border-[1px] border-solid border-lightslategray">
                <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff.svg"
                  />
                  <div className="flex-1 relative leading-[24px]">From</div>
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff2.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="w-[361px] flex flex-row items-start justify-between">
              <div className="relative tracking-[0.5px] leading-[100%]">Wednesday</div>
              <div className="flex flex-row items-end justify-start gap-[8px] text-sm text-limegreen-200">
                <img
                  className="relative rounded-81xl w-[18px] h-[18px] overflow-hidden shrink-0"
                  alt=""
                  src="/plus1.svg"
                />
                <div className="relative leading-[120%] font-semibold">Add Time</div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[16px] text-steelblue">
              <div className="flex-1 rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden flex flex-row items-center justify-start py-2 px-4 border-[1px] border-solid border-lightslategray">
                <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff.svg"
                  />
                  <div className="flex-1 relative leading-[24px]">Until</div>
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff2.svg"
                  />
                </div>
              </div>
              <div className="flex-1 rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden flex flex-row items-center justify-start py-2 px-4 border-[1px] border-solid border-lightslategray">
                <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff.svg"
                  />
                  <div className="flex-1 relative leading-[24px]">From</div>
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff2.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="w-[361px] flex flex-row items-start justify-between">
              <div className="relative tracking-[0.5px] leading-[100%]">Friday</div>
              <div className="flex flex-row items-end justify-start gap-[8px] text-sm text-limegreen-200">
                <img
                  className="relative rounded-81xl w-[18px] h-[18px] overflow-hidden shrink-0"
                  alt=""
                  src="/plus1.svg"
                />
                <div className="relative leading-[120%] font-semibold">Add Time</div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[16px] text-steelblue">
              <div className="flex-1 rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden flex flex-row items-center justify-start py-2 px-4 border-[1px] border-solid border-lightslategray">
                <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff.svg"
                  />
                  <div className="flex-1 relative leading-[24px]">Until</div>
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff2.svg"
                  />
                </div>
              </div>
              <div className="flex-1 rounded-lg bg-base-white shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] box-border h-14 overflow-hidden flex flex-row items-center justify-start py-2 px-4 border-[1px] border-solid border-lightslategray">
                <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff.svg"
                  />
                  <div className="flex-1 relative leading-[24px]">From</div>
                  <img
                    className="relative w-[18px] h-[18px] overflow-hidden shrink-0 hidden"
                    alt=""
                    src="/eyeoff2.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0px] left-[0px] [background:linear-gradient(131.33deg,_#4e5dde,_#3e4fe4)] shadow-[0px_4px_8px_-2px_rgba(16,_24,_40,_0.1),_0px_2px_4px_-2px_rgba(16,_24,_40,_0.06)] flex flex-col items-start justify-start text-mid text-base-white">
        <div className="relative w-[393px] h-11 overflow-hidden shrink-0">
          <img
            className="absolute top-[17px] right-[58px] w-[18px] h-[13px]"
            alt=""
            src="/wifi1.svg"
          />
          <img
            className="absolute top-[17px] right-[26.4px] w-[26.6px] h-[12.5px]"
            alt=""
            src="/-battery2.svg"
          />
          <img className="relative w-[18.2px] h-[11px]" alt="" src="/reception1.svg" />
          <div className="absolute top-[15px] left-[36px] tracking-[-0.02em] leading-[100%] font-medium">
            21:10
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start p-2 gap-[4px] text-left text-[22px]">
          <div
            className="w-12 h-12 flex flex-col items-center justify-center cursor-pointer"
            onClick={onLeadingIconContainerClick}
          >
            <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center p-2">
                <img className="relative w-6 h-6" alt="" src="/iconsarrow-back-24px.svg" />
              </div>
            </div>
          </div>
          <div className="flex-1 relative leading-[28px]">Add a User</div>
          <div className="w-12 h-12 hidden flex-col items-center justify-center">
            <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center p-2">
                <img className="relative w-6 h-6" alt="" src="/iconsmore-vert-24px.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[0px] left-[calc(50%_-_196.5px)] bg-base-white w-[393px] h-20 flex flex-row items-center justify-start py-0 px-4 box-border gap-[8px] text-darkolivegreen">
        <div
          className="flex-1 rounded-81xl overflow-hidden flex flex-row items-center justify-center py-3 px-2 gap-[16px] cursor-pointer border-[1px] border-solid border-limegreen-100"
          onClick={onButtonSecondaryContainerClick}
        >
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
            alt=""
            src="/arrowleft1.svg"
          />
          <div className="relative tracking-[0.1px] leading-[100%] font-semibold flex items-center justify-center w-[155px] h-6 shrink-0">
            Cancel
          </div>
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
            alt=""
            src="/arrowright1.svg"
          />
        </div>
        <div
          className="flex-1 rounded-81xl bg-limegreen-100 overflow-hidden flex flex-row items-center justify-center py-3 px-2 gap-[16px] cursor-pointer text-base-white"
          onClick={onButtonMainContainerClick}
        >
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
            alt=""
            src="/arrowleft1.svg"
          />
          <div className="relative tracking-[0.1px] leading-[100%] font-semibold flex items-center justify-center w-[155px] h-6 shrink-0">
            Add User
          </div>
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
            alt=""
            src="/arrowright1.svg"
          />
        </div>
      </div>
      <div className="absolute bottom-[80px] left-[calc(50%_-_196.5px)] [background:linear-gradient(180deg,_rgba(68,_77,_88,_0),_rgba(68,_77,_88,_0.03))] w-[393px] h-[18px] overflow-hidden" />
    </div>
  )
}

export default AddAUser
