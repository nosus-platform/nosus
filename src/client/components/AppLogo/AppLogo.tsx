import s from './AppLogo.module.pcss';

export const AppLogo = () => (
    <span className={s.AppLogo}>
        <svg width="64" height="64" viewBox="0 0 786 895">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M177.112 2.59426C175.2 3.79597 172.684 6.34231 171.518 8.25417C169.429 11.6791 169.399 13.9396 169.395 164.475C169.393 248.486 169.25 317.221 169.079 317.221C168.907 317.221 162.549 314.049 154.95 310.17C147.352 306.293 125.78 295.321 107.013 285.789C106.096 285.351 110.894 288.017 92.0852 279.37C73.905 270.123 52.3127 259.15 44.1023 254.984C35.8918 250.819 28.5398 246.804 27.7657 246.062C26.9905 245.32 24.6629 244.096 23.9915 243.766C25.4358 244.476 23.1049 243.33 23.9915 243.766C22.9393 243.249 21.1504 242.581 18.5114 242.581C15.9943 242.7 13.92 243.369 13.3286 243.766C14.2796 243.291 12.2623 244.299 13.3286 243.766C11.196 244.832 4.73064 249.827 1.90711 255.833C-0.115634 260.137 -0.147615 265.97 0.115758 583.813L0.384478 894.616H12.7534C21.6707 894.616 25.6128 894.207 26.8817 893.153C28.5099 891.799 28.6411 881.073 28.6411 591.316V278.148L38.5042 283.162C43.9285 285.921 59.6434 293.923 73.4252 300.945C134.406 332.013 118.399 322.701 142.201 334.705C156.276 341.803 168.145 348.09 168.575 348.676C169.874 350.444 169.512 428.041 168.149 440.027C166.212 457.057 169.161 487.244 174.899 509.153C176.052 513.551 177.368 518.589 177.823 520.349C179.067 525.154 183.235 536.784 185.657 542.208C186.835 544.847 189.193 550.053 190.896 553.779C194.531 561.733 194.809 560.362 185.344 581.127C184.153 583.741 179.794 597.164 177.553 605.119C172.868 621.749 169.391 646.964 169.391 664.299C169.391 681.449 172.848 707.888 176.919 721.877C180.347 733.659 184.676 746.56 185.49 747.415C186.019 747.971 186.452 749.106 186.452 749.935C186.452 752.74 200.169 779.396 206.858 789.59C229.851 824.628 262.481 853.239 299.668 870.967C316.598 879.037 337.731 886.438 350.393 888.73C355.061 889.575 358.543 890.143 376.906 893.05C387.185 894.678 781.726 894.437 783.359 892.803C785.232 890.931 785.115 868.082 783.225 866.514C782.21 865.67 759.985 865.248 599.557 865.011C434.4 864.775 369.195 864.348 366.121 863.487C363.775 862.829 358.017 861.478 353.326 860.484C334.445 856.484 309.599 846.35 292.736 835.77C275.915 825.216 252.142 804.127 241.877 790.653C239.866 788.014 237.942 785.615 237.598 785.321C234.03 782.267 219.057 755.911 212.761 741.603C211.164 737.972 205.476 720.32 203.484 712.814C198.859 695.377 196.485 667.943 198.12 650.794C199.385 637.539 201.668 622.676 203.499 615.781C206.039 606.221 211.429 590.191 212.104 590.191C212.517 590.191 214.224 591.99 215.897 594.189C225.459 606.762 231.604 613.327 246.089 626.444C268.879 647.082 297.993 663.647 328.801 673.507C344.737 678.607 354.522 680.724 373.052 683.078C384.298 684.507 426.803 683.732 434.897 681.95C438.122 681.24 444.12 679.939 448.225 679.059C455.959 677.401 465.843 674.757 469.551 673.355C470.724 672.91 475.282 671.241 479.681 669.645C488.87 666.312 509.698 656.403 517.534 651.637C537.402 639.554 557.198 622.777 572.981 604.643C575.913 601.275 578.817 597.964 579.432 597.287C581.989 594.475 589.436 583.781 594.213 576.062C597.024 571.517 599.508 567.798 599.731 567.798C600.361 567.798 616.632 575.73 617.232 576.329C617.525 576.622 629.281 582.672 643.356 589.775C657.431 596.876 685.021 610.857 704.667 620.843C724.314 630.829 690.459 613.555 708.932 622.858C727.406 632.162 742.76 640.021 743.054 640.324C743.965 641.266 765.849 651.86 768.3 652.546C772.974 653.854 781.439 648.535 783.535 642.972C783.978 641.799 784.527 494.731 784.756 316.154L785.172 0H771.843H758.515L757.85 23.4583C757.485 36.3604 757.124 168.3 757.051 327.084C756.976 485.868 756.704 615.781 756.447 615.781C756.189 615.781 742.155 608.756 725.258 600.168C708.362 591.58 744.706 610.12 726.526 600.968C708.346 591.815 693.231 584.084 692.938 583.787C691.905 582.743 678.4 576.329 677.236 576.329C676.587 576.329 675.896 575.965 675.699 575.522C675.504 575.077 663.139 568.541 648.221 560.996C625.039 549.272 616.612 544.9 612.758 542.597C612.35 542.353 613.236 538.927 614.728 534.983C617.139 528.611 619.008 522.74 622.615 510.219C624.362 504.157 625.697 496.733 627.886 480.896C629.827 466.862 629.952 458.63 629.989 343.302C630.028 216.544 629.875 211.122 625.636 190.332C623.216 178.459 616.8 156.289 614.065 150.347C613.524 149.174 612.048 145.815 610.785 142.883C604.454 128.196 590.867 104.27 588.175 103.075C587.736 102.879 587.376 102.228 587.376 101.629C587.376 101.029 585.82 98.5495 583.92 96.1195C582.019 93.6894 580.126 91.221 579.712 90.6345C574.96 83.8892 552.785 61.833 542.528 53.6503C529.023 42.8765 504.079 28.4209 487.145 21.5529C464.094 12.2037 442.212 7.04819 416.237 4.84737C403.74 3.78854 325.021 2.20721 219.507 0.894604C181.684 0.423305 180.489 0.471282 177.112 2.59426ZM197.91 28.8825C197.473 29.3208 197.123 99.7736 197.133 185.446L197.151 341.212L199.443 337.48C213.436 314.709 230.75 293.672 245.517 281.5C248.363 279.154 251.713 276.34 252.959 275.248C254.207 274.156 256.907 271.998 258.959 270.456C261.012 268.913 262.931 267.401 263.224 267.095C265.456 264.766 283.951 253.444 293.105 248.802C320.211 235.059 340.091 228.943 372.519 224.372C384.618 222.667 414.774 222.65 425.3 224.343C459.485 229.843 474.394 234.323 501.006 247.095C513.742 253.208 536.731 267.582 541.525 272.43C541.819 272.727 544.265 274.742 546.962 276.908C555.56 283.812 569.418 298.011 579.286 310.023C581.574 312.808 583.758 315.088 584.139 315.088C585.482 315.088 592.126 296.456 595.927 282.033C603.043 255.032 603.05 211.501 595.944 185.001C593.72 176.704 588.322 160.491 586.838 157.644C585.968 155.977 585.254 154.187 585.249 153.67C585.239 152.08 572.562 127.797 570.192 124.826C569.693 124.201 566.038 119.207 562.069 113.728C551.432 99.0433 531.649 79.5248 517.534 69.7875C514.602 67.7647 511.962 65.8348 511.669 65.4989C511.376 65.163 510.416 64.5574 509.537 64.1522C508.657 63.747 505.538 61.9684 502.606 60.2005C492.093 53.8593 473.773 45.571 463.686 42.5929C460.461 41.6407 456.862 40.4752 455.689 40.0029C454.516 39.5305 449.478 38.3341 444.493 37.3435C439.508 36.354 433.28 35.0691 430.654 34.4891C424.252 33.0752 376.782 31.7039 290.948 30.4532C251.948 29.8838 215.239 29.1193 209.372 28.7535C203.506 28.3867 198.347 28.4453 197.91 28.8825ZM377.317 252.254C357.251 254.14 333.2 260.662 314.993 269.152C305.209 273.715 286.561 283.892 285.616 285.185C285.323 285.586 282.204 288 278.685 290.551C269.111 297.488 256.213 309.201 247.23 319.116C237.112 330.283 238.206 328.891 230.705 340.146C215.225 363.372 203.251 393.084 199.119 418.518C197.444 428.83 196.196 464.443 197.194 473.432C198.68 486.798 201.791 504.289 203.452 508.619C203.902 509.792 205.867 515.625 207.818 521.581L211.364 532.409L215.148 527.446C221.198 519.508 221.786 518.811 229.695 510.218C241.532 497.355 255.405 484.912 265.359 478.23C266.669 477.351 269.6 475.312 271.871 473.699C274.143 472.085 276.445 470.766 276.988 470.766C277.531 470.766 278.134 470.407 278.33 469.967C278.93 468.617 301.817 456.667 311.74 452.522C325.865 446.623 338.637 442.789 355.991 439.238C367.478 436.888 380.12 435.687 405.448 434.543C417.694 433.989 430.41 432.995 433.704 432.334C470.547 424.942 493.776 414.981 521.266 394.785C531.536 387.239 550.864 368.637 557.541 359.872C559.552 357.233 561.449 354.834 561.757 354.541C562.065 354.248 563.933 351.693 565.907 348.863L569.496 343.718L565.94 338.733C545.512 310.097 519.941 287.712 490.945 273.081C479.729 267.422 478.19 266.771 466.885 262.918C463.073 261.618 458.995 260.158 457.822 259.673C455.529 258.726 445.476 256.294 435.928 254.378C421.177 251.418 395.935 250.503 377.317 252.254ZM601.846 343.345C601.301 344.518 598.47 349.316 595.554 354.008C573.048 390.223 538.332 421.786 502.028 439.043C484.491 447.378 478.901 449.586 465.286 453.549C441.678 460.421 432.172 461.797 398.366 463.234C385.604 463.777 372.409 464.76 369.043 465.419C365.676 466.078 359.084 467.362 354.392 468.271C349.7 469.181 344.902 470.317 343.729 470.797C342.556 471.277 338.717 472.524 335.199 473.567C331.68 474.611 327.601 476.084 326.135 476.841C324.669 477.598 322.97 478.22 322.359 478.224C321.093 478.231 300.836 488.441 295.213 491.906C293.16 493.171 290.761 494.535 289.881 494.937C289.002 495.34 288.042 495.943 287.749 496.279C287.456 496.615 284.817 498.545 281.884 500.568C278.952 502.59 276.313 504.522 276.02 504.86C275.726 505.199 273.426 507.08 270.909 509.04C262.522 515.57 244.654 534.454 237.335 544.524C233.359 549.994 229.399 555.407 228.538 556.552C227.675 557.699 226.971 559.463 226.971 560.475C226.971 562.252 239.605 579.987 246.519 587.917C252.227 594.463 265.553 607.078 272.288 612.311C275.806 615.045 278.925 617.555 279.219 617.887C279.979 618.752 292.725 626.759 298.412 629.944C309.257 636.02 315.423 638.939 324.536 642.316C329.814 644.272 335.092 646.246 336.265 646.704C338.415 647.541 347.131 649.875 355.991 651.984C381.773 658.123 422.455 657.405 448.225 650.357C451.744 649.394 456.062 648.225 457.822 647.758C468.606 644.895 498.746 631.691 499.762 629.384C499.958 628.94 500.756 628.577 501.535 628.577C503.159 628.577 525.375 612.577 532.185 606.505C556.446 584.866 575.232 558.432 586.673 529.835C590.034 521.436 592.847 512.98 595.326 503.821C597.174 496.997 599.304 484.246 600.138 475.031C600.641 469.46 601.584 460.583 602.231 455.305C603.698 443.351 603.343 340.121 601.846 343.345Z"
                fill="inherit"
            />
        </svg>
    </span>
);
