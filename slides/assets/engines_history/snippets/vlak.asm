; ------ priprava pro dalsi objekt
PosVlak6:add       si,3             ; adresa dalsiho objektu
         mov       dx,cx            ; stará pozice predesleho objektu
         mov       al,0
         cmp       ds:[si],al       ; je jiz konec vlaku?
         je        PosVlak7
         jmp       PosVlak2         ; neni konec - dalsi vagon

; ------ vymazani posledniho vagonu
PosVlak7:cmp       dl,-1
         je        PosVlak8
         call      DispObr          ; vymazani posledniho vagonu
         mov       al,20            ; pocet pozic
         mul       dh               ; prepocet radku na offset
         add       al,dl
         adc       ah,0
         add       ax,offset Pole
         xchg      ax,di            ; DI <- adresa v poli
         mov       byte ptr ds:[di],0