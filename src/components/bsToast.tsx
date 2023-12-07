"use client";

import { createRoot } from "react-dom/client";

export const toast = {
  remove: () => {
    setTimeout(() => {
      const container = document.getElementById('toast-container');
      const root = createRoot(container!);
      root.unmount();
      toast.currentToast = false;
      if (toast.timeout) {
        clearTimeout(toast.timeout);
        toast.timeout = null;
      }
    }, 0)
  },
  currentToast: false,
  timeout: null,
  notify: (message: any, options: any = null) => {
    let duration = 5;
    let color = 'grey';
    if (options) {
      if (options.duration)
        duration = options.duration;
      if (options.type === "info")
        color = 'grey';
      if (options.type === "success")
        color = 'green';
      if (options.type === "error")
        color = 'red';
      if (options.type === "warn")
        color = 'orange';
    }

    if (toast.currentToast) {
      toast.remove();
    }
    let trasitionPercentage = 0.3 * (100 / duration);
    const container = document.getElementById('toast-container');
    const root = createRoot(container!);
    root.render(<Toast
      message={message}
      slideIn={true}
      color={color || null}
      transitionPercentage={trasitionPercentage}
      duration={duration} close={toast.remove} />);
    toast.currentToast = true;
    setTimeout(toast.remove, duration * 1000)
  }
}

export const ToastContainer = (props: any) => {
  return (
    <div id="toast-container" className="toast-container">
      <style jsx>{`
          .toast-container {
            position: fixed;
            width: 100%;
            top: 20px;
            right: 0px;
          }
        `}</style>
    </div>
  )
}

const Toast = (props: any) => {
  return (
    <div className="toast-message-container">
      <div className="side-bar"></div>
      <div id="toast-message" className="toast-message flex flex-row justify-between">
        <span>
          {props.message}
        </span>
        <button onClick={props.close} ><img src="/close.svg" width={16} height={16} alt="Close"></img></button>
      </div>
      <style jsx>{`
          .toast-message {
            flex:1;
            background-color: #fff;
            padding: 15px 10px;
            border-radius: 4px;
            font-family: 'Open Sans', sans-serif;
          }
          .side-bar{
            padding: 10px;
            border-radius: 4px;
          }
      `}</style>
      <style jsx>{`
          @keyframes SlideInOut {
            0%{
              transform: translateY(-40px);
              opacity:0;
            }
            1% {
              transform: translateY(0px);
              opacity:1;
            }
            99% {
              transform: translateY(0px);
              opacity:1;
            }
            100% {
              transform: translateY(-40px);
              opacity:0;
            }
          }
          .toast-message-container {
            color: ${props.color || 'grey'};
            max-width: 400px;
            background: ${props.color || 'grey'};
            box-shadow: 0px 0px 30px #0000001f;
            margin: 0px auto;
            border-radius: 4px;
            display: flex;
            animation: SlideInOut ${props.duration}s ease-in-out;
          }
        `}</style>
    </div>
  )
}