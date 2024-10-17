/*
 * @Description: Custom hook for creating and managing Leafer components
 * 
 * @Author: Jin
 * @Date: 2024-10-14 10:48:31
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { UI } from "leafer-ui";
import { useEffect } from "react";
import { useLeaferContext } from "./useLeaferContext";


/**
 * Custom hook for creating and managing Leafer components
 * @template T Component type extending UI
 * @param {() => T} createComponent Function to create the component
 * @returns {null} Does not return anything
 */
function useLeaferComponent<T extends UI>(createComponent: () => T) {
  // Get parent component context
  const parentComponent = useLeaferContext<T>();

  useEffect(() => {
    // Create component instance
    const component = createComponent();
    // If parent component doesn't exist, do nothing
    if (!parentComponent) return;
    // Add component to parent
    console.log(parentComponent, component);
    parentComponent.add(component);
    // Cleanup function, remove on component unmount
    return () => {
      // Remove component
      parentComponent.remove(component);
      // Destroy component to prevent memory leaks
      component.destroy();
    };
  }, [parentComponent, createComponent]); // Dependencies: parent component and create component function

  return null;
}

export default useLeaferComponent;