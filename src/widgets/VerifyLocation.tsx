import { useRef, useState } from "react";
import { VerifyMap } from "@entities/map/ui";
import { VerifyMapBottomSheet } from "@features/verification/ui";
import BottomSheet from "@gorhom/bottom-sheet";


const VerifyLocation =() => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const showTab =() => {
    bottomSheetRef.current?.expand()
  }

  return (
    <>
      <VerifyMap showTab={showTab} />
      <VerifyMapBottomSheet ref={bottomSheetRef} />
    </>
  )
}

export default VerifyLocation;