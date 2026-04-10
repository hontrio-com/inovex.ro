'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Cpu } from 'lucide-react';
import { SCENARIOS } from '@/lib/workflow-demo-data';
import type { LogEntry } from '@/lib/workflow-demo-data';
import ScenarioSelector from './ScenarioSelector';
import WorkflowCanvas from './WorkflowCanvas';
import WorkflowLog from './WorkflowLog';

type ExecutionStatus = 'idle' | 'running' | 'completed';

export default function DemoWorkflow() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>('idle');
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [runCount, setRunCount] = useState(0);
  const [totalActions, setTotalActions] = useState(0);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const resetState = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setExecutionStatus('idle');
    setActiveNodes(new Set());
    setCompletedNodes(new Set());
    setActiveConnections(new Set());
    setVisibleLogs([]);
  }, []);

  const handleScenarioSelect = useCallback(
    (index: number) => {
      resetState();
      setActiveScenario(index);
    },
    [resetState],
  );

  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const runSimulation = useCallback(() => {
    if (executionStatus === 'running') return;

    resetState();

    const scenario = SCENARIOS[activeScenario];
    const nodes = scenario.nodes;
    const logs = scenario.logs;

    setExecutionStatus('running');

    let cumulativeDelay = 0;
    const STEP_DELAY = 800;
    const COMPLETE_DELAY = 300;

    nodes.forEach((node, i) => {
      // Activate node
      addTimeout(() => {
        setActiveNodes((prev) => new Set([...prev, node.id]));

        if (i > 0) {
          const prevNode = nodes[i - 1];
          const connKey = `${prevNode.id}->${node.id}`;
          setActiveConnections((prev) => new Set([...prev, connKey]));
        }

        // Add log entry
        const logIndex = Math.min(i * 2, logs.length - 1);
        if (logs[logIndex]) {
          setVisibleLogs((prev) => [...prev, logs[logIndex]]);
        }
      }, cumulativeDelay);

      cumulativeDelay += STEP_DELAY;

      // Add second log entry + complete node
      addTimeout(() => {
        const logIndex = Math.min(i * 2, logs.length - 1);
        if (logs[logIndex + 1]) {
          setVisibleLogs((prev) => [...prev, logs[logIndex + 1]]);
        }

        setActiveNodes((prev) => {
          const next = new Set(prev);
          next.delete(node.id);
          return next;
        });
        setCompletedNodes((prev) => new Set([...prev, node.id]));
      }, cumulativeDelay);

      cumulativeDelay += COMPLETE_DELAY;
    });

    // Final completion
    addTimeout(() => {
      setExecutionStatus('completed');
      setRunCount((prev) => prev + 1);
      setTotalActions((prev) => prev + scenario.actionsCount);
    }, cumulativeDelay + 100);
  }, [executionStatus, activeScenario, resetState]);

  const currentScenario = SCENARIOS[activeScenario];

  return (
    <section id="demo-interactiv" className="bg-[#F8FAFB] py-[100px]">
      {/* Header */}
      <div className="max-w-[640px] mx-auto text-center mb-12 px-4">
        <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
          <Cpu size={13} />
          Demo interactiv
        </Badge>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#0D1117',
            marginBottom: 16,
          }}
        >
          Vezi cum functioneaza{' '}
          <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>un workflow AI</span>
        </h2>
        <p style={{ color: '#4A5568', fontSize: '0.9375rem', lineHeight: 1.7 }}>
          Alege un scenariu, apasa Run si urmareste executia pas cu pas. Asa arata automatizarile pe care le implementam pentru clientii nostri.
        </p>
      </div>

      {/* Demo wrapper */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.10)',
            border: '1px solid #E8ECF0',
          }}
        >
          {/* Chrome bar */}
          <div
            style={{
              height: 40,
              background: '#F4F6F8',
              borderBottom: '1px solid #E8ECF0',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA41' }} />
            </div>
            <div
              style={{
                flex: 1,
                maxWidth: 320,
                margin: '0 auto',
                background: 'white',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 11,
                color: '#8A94A6',
                border: '1px solid #E8ECF0',
                textAlign: 'center',
              }}
            >
              inovex.ro / workflow-demo
            </div>
            <Badge
              style={{
                background: 'rgba(16,185,129,0.10)',
                borderColor: 'rgba(16,185,129,0.25)',
                color: '#065F46',
                fontSize: 10,
              }}
            >
              Live Simulation
            </Badge>
          </div>

          {/* 3-panel layout */}
          <div
            className="flex flex-col lg:flex-row"
            style={{ minHeight: 520 }}
          >
            {/* Left panel: ScenarioSelector */}
            <div
              className="w-full lg:w-[280px]"
              style={{ flexShrink: 0, minHeight: 200 }}
            >
              <ScenarioSelector
                scenarios={SCENARIOS}
                activeIndex={activeScenario}
                onSelect={handleScenarioSelect}
              />
            </div>

            {/* Center panel: WorkflowCanvas */}
            <div style={{ flex: 1, minWidth: 0, minHeight: 300 }}>
              <WorkflowCanvas
                scenario={currentScenario}
                activeNodes={activeNodes}
                completedNodes={completedNodes}
                activeConnections={activeConnections}
                isRunning={executionStatus === 'running'}
                isCompleted={executionStatus === 'completed'}
                onRun={runSimulation}
                onReset={resetState}
                executionStatus={executionStatus}
              />
            </div>

            {/* Right panel: WorkflowLog */}
            <div
              className="w-full lg:w-[260px]"
              style={{ flexShrink: 0, minHeight: 200 }}
            >
              <WorkflowLog
                logs={visibleLogs}
                isRunning={executionStatus === 'running'}
                isCompleted={executionStatus === 'completed'}
                runCount={runCount}
                totalActions={totalActions}
                duration={currentScenario.duration}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
