; ------ prep for next object
PosVlak6:add       si,3             ; next obj address
         mov       dx,cx            ; prev obj position
         mov       al,0
         cmp       ds:[si],al       ; train tail yet?
         je        PosVlak7
         jmp       PosVlak2         ; not tail - next car

; ------ last car deletion
PosVlak7:cmp       dl,-1
         je        PosVlak8
         call      DispObr          ; last car deletion
         mov       al,20            ; position counter
         mul       dh               ; row-offset recalc
         add       al,dl
         adc       ah,0
         add       ax,offset Pole
         xchg      ax,di            ; DI <- array address
         mov       byte ptr ds:[di],0